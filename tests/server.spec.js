const request = require("supertest");
const app = require("../index");

describe("GET /cafes", () => {
    it("Testing ruta get /cafes response a 200 status ", async () => {
        const response =   await request(app).get("/cafes").send()
        expect(response.status).toBe(200)
    })
    it("Response with a array of object",async () =>{
        const response = await request(app).get("/cafes")
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toBeInstanceOf(Object);
    }

    )
});

describe('DELETE /cafes/:id', () => {
    it("Returns 404 when deleting a non-existing cafe", async () => {
        const response = await request(app)
            .delete("/cafes/9999") // ID inventado de prueba
            .set("Authorization", "Bearer some-valid-token"); // Token inventado de prueba
        expect(response.status).toBe(404);
    });
})

describe('POST /cafes', () => {
    it('Adds new cofee and return 201 status', async () => {
        const newCafe = {
            id: 5, // ID inventado de prueba
            name: "Café Nuevo"
        };
        const response = await request(app)
            .post("/cafes")
            .send(newCafe);
        expect(response.status).toBe(201);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toContainEqual(newCafe);
    })
})

describe('PUT /cafes', () => {
    it("Returns 400 when updating a cafe with mismatched IDs", async () => {
        const updatedCafe = {
            id: 8, // id de prueba 
            name: "Café Actualizado"
        };
        const response = await request(app)
            .put("/cafes/1") // Un ID diferente en los parámetros
            .send(updatedCafe);
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("El id del parámetro no coincide con el id del café recibido");
    });
})