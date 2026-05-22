export async function parseApiResponse(response) {
  const rawText = await response.text()

  if (!rawText) {
    return {
      ok: response.ok,
      status: response.status,
      data: null,
      message: response.statusText || 'Empty response from server',
    }
  }

  try {
    return {
      ok: response.ok,
      status: response.status,
      data: JSON.parse(rawText),
      message: null,
    }
  } catch {
    return {
      ok: response.ok,
      status: response.status,
      data: null,
      message: rawText,
    }
  }
}