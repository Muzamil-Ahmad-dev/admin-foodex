 import adminAxios from "../../api/adminApi"; // reuse admin axios

// -----------------------------
// Get all contact queries (Admin)
// -----------------------------
export const fetchContacts = async () => {
  try {
    const res = await adminAxios.get("/contact");
    return res.data.data; // adjust if your backend structure is different
  } catch (err) {
    console.error("Fetch contacts error:", err.response?.data?.message || err.message);
    throw err;
  }
};

// -----------------------------
// Get single contact
// -----------------------------
export const fetchContactById = async (id) => {
  try {
    const res = await adminAxios.get(`/contact/${id}`);
    return res.data.data;
  } catch (err) {
    console.error("Fetch contact error:", err.response?.data?.message || err.message);
    throw err;
  }
};

// -----------------------------
// Respond to contact
// -----------------------------
export const respondToContact = async (id, responseData) => {
  try {
    const res = await adminAxios.put(`/contact/${id}/respond`, responseData);
    return res.data.data;
  } catch (err) {
    console.error("Respond contact error:", err.response?.data?.message || err.message);
    throw err;
  }
};

// -----------------------------
// Delete contact
// -----------------------------
export const deleteContact = async (id) => {
  try {
    const res = await adminAxios.delete(`/contact/${id}`);
    return res.data;
  } catch (err) {
    console.error("Delete contact error:", err.response?.data?.message || err.message);
    throw err;
  }
};
