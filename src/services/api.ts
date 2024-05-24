export const getBars = async () => {
    const response = await fetch('/api/bars');
    if (!response.ok) {
      throw new Error('Failed to fetch bars');
    }
    const data = await response.json();
    return data;
  };
  