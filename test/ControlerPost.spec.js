    // Tests that providing valid inputs creates a new user and returns the user object. tags: [happy path]
    it("test_valid_inputs_create_user", async () => {
        const mockUser = {
            username: "testuser",
            firstname: "Test",
            lastname: "User",
            email: "testuser@test.com",
            password: "password123",
            cellnumber: "1234567890",
            address: "123 Main St",
            image: "testimage.jpg"
        };
        const result = await signUp(mockUser.username, mockUser.firstname, mockUser.lastname, mockUser.email, mockUser.password, mockUser.cellnumber, mockUser.address, mockUser.image);
        expect(result).toMatchObject(mockUser);
    });

    // Tests that providing empty strings or null values for required inputs returns an error message. tags: [edge case]
    it("test_empty_strings_null_values_return_error", async () => {
        const result = await signUp("", null, "Last", "email@test.com", "password123", "", "123 Main St", "");
        expect(result).toEqual({message: "El usuario no pudo ser creado"});
    });

    // Tests that providing invalid data types for inputs returns an error message. tags: [edge case]
    it("test_invalid_data_types_return_error", async () => {
        const result = await signUp("username", "firstname", "lastname", 123, true, [], {}, "image.jpg");
        expect(result).toEqual({message: "El usuario no pudo ser creado"});
    });

    // Tests that providing inputs that exceed the maximum length returns an error message. tags: [edge case]
    it("test_inputs_exceeding_maximum_length_return_error", async () => {
        const username = "a".repeat(51);
        const firstname = "b".repeat(51);
        const lastname = "c".repeat(51);
        const email = "d".repeat(101) + "@example.com";
        const password = "e".repeat(51);
        const cellnumber = "1234567890";
        const address = "f".repeat(201);
        const image = "g".repeat(1001);

        const result = await signUp(username, firstname, lastname, email, password, cellnumber, address, image);

        expect(result).toEqual({message: "El usuario no pudo ser creado"});
    });

        // Tests that the function uses async/await to handle asynchronous operations. tags: [behavior]
        it("test_async_await_handling", async () => {
            const username = "testuser";
            const firstname = "Test";
            const lastname = "User";
            const email = "testuser@example.com";
            const password = "password";
            const cellnumber = "1234567890";
            const address = "123 Main St";
            const image = "image.jpg";
    
            const result = await signUp(username, firstname, lastname, email, password, cellnumber, address, image);
    
            expect(result.username).toEqual(username);
            expect(result.firstname).toEqual(firstname);
            expect(result.lastname).toEqual(lastname);
            expect(result.email).toEqual(email);
            expect(result.password).toEqual(password);
            expect(result.cellnumber).toEqual(cellnumber);
            expect(result.address).toEqual(address);
            expect(result.image).toEqual(image);
        });

            // Tests that the function catches errors using a try/catch block and returns an error message if necessary. tags: [behavior]
    it("test_error_handling", async () => {
        const mockError = new Error("Mock error");
        User.create = jest.fn().mockRejectedValue(mockError);

        const result = await signUp("testuser", "Test", "User", "testuser@example.com", "password", "1234567890", "123 Main St", "image.jpg");

        expect(result).toEqual({message: "El usuario no pudo ser creado"});
        expect(console.error).toHaveBeenCalledWith(mockError);
    });