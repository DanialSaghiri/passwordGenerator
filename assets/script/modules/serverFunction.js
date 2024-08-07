const API = "http://localhost:3004/";

export const server = {
    GET: async destination => {
        const response = await fetch(API + destination);
        const data = await response.json();

        return data;
    },
    POST: (destination, item) => {
        fetch(API + destination, {
            method: "POST",
            body: JSON.stringify(item),
            headers: {"Content-type": "application/json"},
        });
    },
    PATCH: (destination, id, newData) =>
        fetch(API + `${destination}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(newData),
            headers: {"Content-type": "application/json"},
        }),
    DELETE: (destination, id) =>
        fetch(API + `${destination}/${id}`, {
            method: "DELETE",
        }),
};
