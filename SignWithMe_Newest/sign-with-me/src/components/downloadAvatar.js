export const downloadAvatar = async (avatarUrl) => {
    try {
      const response = await fetch("http://localhost:5000/download-avatar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ avatarUrl }),
      });
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error downloading avatar:", error);
      return { success: false, error: error.message };
    }
  };
  