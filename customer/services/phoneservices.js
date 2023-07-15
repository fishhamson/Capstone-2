export class Service {
    getPhones = async () => {
        try {
            const res = await axios({
                url: 'https://64a3f42bc3b509573b56d12f.mockapi.io/products',
                method: 'GET',
            });
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
    getPhoneById = async (id) => {
        try {
            const res = await axios({
                url: `https://64a3f42bc3b509573b56d12f.mockapi.io/products/${id}`,
                method: 'GET',
            });

            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
}