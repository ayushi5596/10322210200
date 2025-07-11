const LOGGING_API_URL = "http://20.244.56.144/evaluation-service/logs";

const logEvent = async (level, message, metadata = {}) => {
  const body = {
    stack: "frontend",
    level: level.toLowerCase(),
    message,
    timestamp: new Date().toISOString(),
    metadata,
  };

  try {
    const res = await fetch(LOGGING_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      console.warn("Logger failed:", res.statusText);
    }
  } catch (err) {
    console.error("Logger error:", err);
  }
};

export default logEvent;
