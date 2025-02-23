import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Define the structure for each form field
export interface FieldConfig {
    key: string;
    label: string;
    type: "text" | "select" | "checkbox" | "number";
    options?: { value: string; label: string }[]; // Options for select fields
    placeholder?: string;
    validation?: z.ZodType<any>; // Validation schema using Zod
}

// Define the props expected by the DynamicForm component
interface DynamicFormProps {
    config: FieldConfig[]; // Configuration for form fields
    defaultValues?: Record<string, any>; // Optional default values for form fields
    onSubmit: (values: Record<string, any>) => void; // Submission handler
}

const getValidationByType = (type: string): z.ZodType => {
    switch (type) {
        case 'number':
            return z.coerce.number().min(-999999).max(999999); //https://www.reddit.com/r/reactjs/comments/1arbsec/how_do_you_work_with_numbers_within_forms_rhf_zod/?rdt=62491
        case 'text':
            return z.string().nullish();
        case 'checkbox':
            return z.boolean();
        default:
            return z.string();
    }
};

const DynamicForm: React.FC<DynamicFormProps> = ({ config, defaultValues = {}, onSubmit }) => {
    // Construct a validation schema dynamically based on the provided config
    const schema = z.object(
        Object.fromEntries(
            config.map((field) => [field.key, field.validation || getValidationByType(field.type)])
        )
    );

    // Initialize react-hook-form with validation and default values
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(schema), // Use Zod for validation
        defaultValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {config.map((field) => (
                <div key={field.key}>
                    <label>{field.label}</label>
                    {/* Render input field based on type */}
                    {field.type === "text" && (
                        <input
                            type="text"
                            placeholder={field.placeholder || ""}
                            {...register(field.key)}
                        />
                    )}
                    {/* Render select dropdown if type is 'select' */}
                    {field.type === "select" && (
                        <select {...register(field.key)}>
                            {field.options?.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    )}
                    {/* Render checkbox if type is 'checkbox' */}
                    {field.type === "checkbox" && (
                        <input type="checkbox" {...register(field.key)} />
                    )}
                    {field.type === "number" && (
                        <input type="number" {...register(field.key)} />
                    )}
                    {/* Display error message if validation fails */}
                    {errors[field.key] && <p>{errors[field.key].message}</p>}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    );
};

export default DynamicForm;
