async function Request({ route, method, body }) {
  let response = {
    success: false,
    status: null,
    data: null,
    message: null,
  };

  try {
    const reqResult = await fetch(import.meta.env.VITE_LOCAL_URL + route, {
      method: method,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
    });

    // Update status in response object
    response.status = reqResult.status;

    // Parse JSON if possible, otherwise fallback to text
    const data = await reqResult.json().catch(() => null);

    if (reqResult.ok) {
      response.success = true;
      response.data = data;
    }
    response.message = data.message;
  } catch (error) {
    response.message = `Network error: ${error.message}`;
  }

  return response;
}

export default Request;
