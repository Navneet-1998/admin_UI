async function fetchData() {
    try {
        const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json");
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data) {
            return data;
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}


export { fetchData };