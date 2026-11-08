"use client";
import {FloppyDisk} from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { useState } from 'react';

const NewUserpage = () => {
const [error, setError] = useState('');
const onSubmit = async (event) => {
  event.preventDefault();
  setError('');

  const formData = new FormData(event.target);
  const newUsers = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('http://localhost:8000/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUsers),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Failed to create user');

    console.log('created user', data);
    event.target.reset();
  } catch (err) {
    setError(err.message);
  }
};
    return (
<div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-sky-100 p-4">
  <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-black/5">
    <h1 className="text-2xl font-bold text-indigo-900">Create a new user</h1>
    <p className="mb-6 mt-1 text-sm text-gray-500">
      Add a new user to your database.
    </p>

    <Form className="w-full" onSubmit={onSubmit}>
      <Fieldset>
        <Fieldset.Legend>Profile Settings</Fieldset.Legend>
        <Description>Update your profile information.</Description>
        <FieldGroup>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
        </FieldGroup>

        {error && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <Fieldset.Actions className="mt-4 flex gap-3">
          <Button type="submit">
            <FloppyDisk />
            Save
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </Fieldset.Actions>
      </Fieldset>
    </Form>
  </div>
</div>
);
};

export default NewUserpage;