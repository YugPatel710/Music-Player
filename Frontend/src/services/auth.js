export const signin = async (email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'test@example.com' && password === 'password123') {
    return { status: 200, message: 'Signed in successfully' };
  }

  throw new Error('Invalid login details. Please try again.');
};

export const signup = async (email, password) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (email === 'test@example.com') {
    throw new Error('Email is already taken. Try a different one.');
  }

  return { status: 200, message: 'Account created successfully' };
};