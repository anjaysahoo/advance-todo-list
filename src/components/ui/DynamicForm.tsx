import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

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
    const form = useForm({
        resolver: zodResolver(schema), // Use Zod for validation
        defaultValues,
    });

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-100 space-y-4">
                {config.map((field) => (
                    <FormField
                        key={field.key}
                        control={form.control}
                        name={field.key}
                        render={({ field: formField }) => (
                            <FormItem>
                                <FormLabel>{field.label}</FormLabel>
                                {field.type === "text" && (
                                    <FormControl>
                                        <Input
                                            placeholder={field.placeholder || ""}
                                            {...formField}
                                        />
                                    </FormControl>
                                )}
                                {field.type === "number" && (
                                    <FormControl>
                                        <Input
                                            type="number"
                                            placeholder={field.placeholder || ""}
                                            {...formField}
                                            onChange={(e) => {
                                                const value = e.target.value === '' ? '' : e.target.valueAsNumber;
                                                formField.onChange(value);
                                            }}
                                        />
                                    </FormControl>
                                )}
                                {field.type === "select" && (
                                    <FormControl>
                                        <Select
                                            onValueChange={formField.onChange}
                                            defaultValue={formField.value}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder={field.placeholder} />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {field.options?.map((option) => (
                                                    <SelectItem
                                                        key={option.value}
                                                        value={option.value}
                                                    >
                                                        {option.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                )}
                                {field.type === "checkbox" && (
                                    <FormControl>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                checked={formField.value}
                                                onCheckedChange={formField.onChange}
                                            />
                                            {field.placeholder && (
                                                <span className="text-sm text-muted-foreground">
                                                    {field.placeholder}
                                                </span>
                                            )}
                                        </div>
                                    </FormControl>
                                )}
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </Form>
    );
};

export default DynamicForm;
