export const metadata = {
  title: "Blog",
  description: "Blog",
};
export default function BlogLayout({ children }) {
  return (
    <section>
      {children}
    </section>
  )
}