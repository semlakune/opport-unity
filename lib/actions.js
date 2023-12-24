"use server";

export async function getLocations() {
  try {
    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries/states",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: "Indonesia",
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const locations = await response.json();

    return locations.data.states.map((state) => {
      return {
        label: state.name,
        value: `${state.name}, Indonesia`,
      };
    });
  } catch (error) {
    console.error('Failed to fetch locations:', error);
    return error
  }
}

export async function getCategories() {
  try {
    const response = await fetch(process.env.BASE_URL + "/api/categories", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    let categories = await response.json();
    // Sorting the categories such that 'Other' is always the last category
    categories.sort((a, b) => {
      if (a.name === 'Other') {
        return 1;
      }
      if (b.name === 'Other') {
        return -1;
      }
      return a.id - b.id;
    });
    return categories;
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return error
  }
}

export async function getJobs() {
  try {
    const response = await fetch(process.env.BASE_URL + "/api/jobs", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return error
  }
}

export async function getJob(id) {
  try {
    const response = await fetch(process.env.BASE_URL + "/api/job/?id=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch job:', error);
    return error
  }
}

export async function getJobsByEmployerId(id) {
  try {
    const response = await fetch(process.env.BASE_URL + "/api/jobs?employerId=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch jobs:', error);
    return error
  }
}

export async function getCandidatesByEmployerId(id) {
  try {
    const response = await fetch(process.env.BASE_URL + "/api/candidates?employerId=" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json()
  } catch (error) {
    console.error('Failed to fetch candidates:', error);
    return error
  }
}