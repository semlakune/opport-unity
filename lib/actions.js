"use server";

export async function getJobs(params = {}) {
  try {
    // Construct the query string from the params object
    const queryString = new URLSearchParams(params).toString();
    console.log()
    const url = `${process.env.BASE_URL}/api/jobs?${queryString}`;

    const response = await fetch(url, {
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


export async function updateUserPhoto(formData) {
  try {
    const response = await fetch(process.env.BASE_URL + "/api/s3upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getProfile(username) {
  try {
    const response = await fetch(
      process.env.BASE_URL + `/api/profile/?username=${username}`);

    return await response.json();
  } catch (error) {
    console.error(error)
  }
}