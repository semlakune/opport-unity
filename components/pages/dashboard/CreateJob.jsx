"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {useRouter} from "next/navigation";
import {JobSchema} from "@/lib/schema";
import {useQuery} from "@tanstack/react-query";
import {getCategories} from "@/lib/actions";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CaretSortIcon, CheckIcon, FilePlusIcon, ReloadIcon, ResetIcon} from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {Textarea} from "@/components/ui/textarea";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {jobLevel, jobType, workModel} from "@/lib/constants";
import InputList from "@/components/ui/input-list";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {toast} from "sonner";

export default function CreateJob() {
  const router = useRouter()
  const { data: session } = useSession()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["locations", "categories"],
    queryFn: async () => {
      const response = await fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          country: "Indonesia"
        })
      })
      const data = await response.json()
      const states = data.data.states.map((state) => {
        return {
          label: state.name,
          value: `${state.name}, Indonesia`
        }
      })
      const categories = await getCategories()
      return {
        states: states,
        categories
      }
    },
  })

  const form = useForm({
    resolver: zodResolver(JobSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      salaryRange: "",
      level: "",
      type: "",
      workModel: "",
      categoryId: "",
      qualifications: [],
      responsibilities: [],
      employerId: session && session.user?.employerId
    }
  })

  const onSubmit = async (values) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/job", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      if (data.error) {
        console.log(data.error)
      }

      if (data.id) {
        toast.success("Job created successfully")
        router.push("/dashboard/my-jobs")
      }
      setIsSubmitting(false)
    } catch (error) {
      setIsSubmitting(false)
      console.error(error)
    }
  }

  return (
    <div className={"flex flex-col gap-5 mt-5"}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >
          {/*title*/}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input placeholder="Frontend Developer" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*description*/}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    className={"max-h-[150px]"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*location*/}
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? data?.states.find(
                            (location) => location.value === field.value,
                          )?.label
                          : "Select location..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    sideOffset={0}
                    side={"bottom left"}
                    className="w-full p-0 mt-10"
                  >
                    <Command>
                      <CommandInput
                        placeholder="Search location..."
                        className="h-9"
                      />
                      <CommandEmpty>No location found.</CommandEmpty>
                      <CommandGroup
                        className={"max-h-[200px] overflow-y-scroll"}
                      >
                        {data?.states.map((location) => (
                          <CommandItem
                            value={location.label}
                            key={location.value}
                            onSelect={() => {
                              form.setValue("location", location.value, {
                                shouldValidate: true,
                              });
                            }}
                          >
                            {location.label}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                location.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*salaryRange*/}
          <FormField
            control={form.control}
            name="salaryRange"
            render={({ field: { onChange, value, ...field } }) => (
              <FormItem>
                <FormLabel>Salary Range</FormLabel>
                <FormControl>
                  <Input
                    type={"text"}
                    value={value}
                    onChange={(e) => {
                      let inputValue = e.target.value.replace(/[^\d-]/g, "");
                      let rangeParts = inputValue.split("-").map((part) => {
                        let num = part.replace(/^0+/, "");
                        return num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                      });

                      inputValue = rangeParts.join(" - ");
                      if (!inputValue.startsWith("IDR ")) {
                        inputValue = "IDR " + inputValue;
                      }

                      onChange(inputValue);
                    }}
                    placeholder="IDR 1.000.000 - IDR 10.000.000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*level*/}
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Level</FormLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValue("level", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={`w-full focus:ring-0 ${
                      !field.value && "text-muted-foreground"
                    }`}
                  >
                    <SelectValue
                      placeholder="Select job level"
                      aria-label={"Job Level"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {jobLevel?.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.level ? (
                  <p className={"text-[0.8rem] font-medium text-destructive"}>
                    Please choose a level
                  </p>
                ) : null}
              </FormItem>
            )}
          />
          {/*type*/}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValue("type", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={`w-full focus:ring-0 ${
                      !field.value && "text-muted-foreground"
                    }`}
                  >
                    <SelectValue
                      placeholder="Select job type"
                      aria-label={"Job Type"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {jobType?.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.type ? (
                  <p className={"text-[0.8rem] font-medium text-destructive"}>
                    Please choose a type
                  </p>
                ) : null}
              </FormItem>
            )}
          />
          {/*workModel*/}
          <FormField
            control={form.control}
            name="workModel"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Work Model</FormLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValue("workModel", value, { shouldValidate: true })
                  }
                >
                  <SelectTrigger
                    className={`w-full focus:ring-0 ${!field.value && "text-muted-foreground"}`}
                  >
                    <SelectValue
                      placeholder="Select work model"
                      aria-label={"Work Model"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {workModel?.map((model) => (
                      <SelectItem key={model.value} value={model.value}>
                        {model.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.workModel ? (
                  <p className={"text-[0.8rem] font-medium text-destructive"}>
                    Please choose a Work Model
                  </p>
                ) : null}
              </FormItem>
            )}
          />
          {/*category*/}
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Category</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? data?.categories.find(
                            (category) => category.id === field.value,
                          )?.name
                          : "Select a category..."}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    sideOffset={0}
                    side={"bottom left"}
                    className="w-full p-0 mt-10"
                  >
                    <Command>
                      <CommandInput
                        placeholder="Search categories..."
                        className="h-9"
                      />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup
                        className={"max-h-[200px] overflow-y-scroll"}
                      >
                        {data?.categories.map((category) => (
                          <CommandItem
                            value={category.id}
                            key={category.id}
                            onSelect={() => {
                              form.setValue("categoryId", category.id, {
                                shouldValidate: true,
                              });
                            }}
                          >
                            {category.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                category.id === field.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*qualifications*/}
          <FormField
            control={form.control}
            name="qualifications"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Qualifications</FormLabel>
                <FormControl>
                  <InputList {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/*responsibilities*/}
          <FormField
            control={form.control}
            name="responsibilities"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Responsibilities</FormLabel>
                <FormControl>
                  <InputList {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="col-span-2 justify-self-end flex gap-2">
            <Button type="button" variant={"outline"} onClick={() => router.push("/dashboard/my-jobs")}>
              <ResetIcon className={"mr-2"} /> Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 animate-spin" />{" "}
                  {"Creating job.."}
                </>
              ) : (
                <>
                  <FilePlusIcon className={"mr-2"} /> Save
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}