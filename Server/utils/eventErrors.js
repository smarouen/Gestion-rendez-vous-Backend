// handle errors function
const handleEventErrors = (error, res) => {
    // Errors Schema
    const SchemaErrors = { title: '', date: '', description: '' };

    // Schema validation errors
    if (error.errors) {
        Object.values(error.errors).forEach(error => {
            SchemaErrors[error.properties.path] = error.properties.message;
        });
        return res.status(500).json(SchemaErrors);
    }

    // Duplicate Errors
    else if (error.code === 11000) {
        console.log(error);
        // Assuming 'date' is the field causing the duplicate key error
        SchemaErrors['date'] = `This is a duplicate date. Please enter a new one.`;
        return res.status(500).json(SchemaErrors);
    } else {
        return res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = handleEventErrors;