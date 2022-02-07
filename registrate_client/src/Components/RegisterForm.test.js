import { render, screen, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import user from '@testing-library/user-event'
import { beforeEach } from '@jest/globals';


test('form renders', () => {
  render(<RegisterForm />);
});



test('calls onSubmit prop function when form is submitted and all validations pass', () => {
    const onSubmit = jest.fn();
    user.type(getFirstName(),"Vladimir")
    user.type(getLastName(), "Kubliy")
    user.type(getEmail(), "vlad@email.com")
    const dropdown = screen.getByRole('combobox', {name:/age/i})
    user.selectOptions(dropdown, within(dropdown).getByRole('option', {key:/18/i}))
    user.type(getCountry(), "Canada")
    user.click(screen.getByRole('button', {name:/submit/i}))
    // await waitFor(() => {
    //     expect(onSubmit).toHaveBeenCallledTimes(1);
    // })
    expect(onSubmit).toHaveBeenCallledWith({
        "first_name": "Vladimir",
        "last_name": "Kubliy",
        "age": 18,
        "email": "vlad@email.com",
        "country": "Canada"
    })
    
   
});

function getFirstName() {
    return screen.getByRole('textbox', {
        name: /firstName/i
    });
}

function getLastName() {
    return screen.getByRole('textbox', {
        name: /lastName/i
    });
}

function getEmail() {
    return screen.getByRole('textbox', {
        name: /email/i
    });
}

function getCountry() {
    return screen.getByRole('textbox', {
        name: /country/i
    });
}

