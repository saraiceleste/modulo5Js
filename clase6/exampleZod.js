const schema = z.object({

  name: z.string().min(1, "El nombre es obligatorio"),

  age: z.number().int().positive("La edad debe ser un número positivo"),

});
