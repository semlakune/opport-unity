"use server";

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