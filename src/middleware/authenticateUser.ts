import { supabase } from '../lib/supaBaseClient';
import jwt from 'jsonwebtoken';

export interface User {
  id: string;
  email: string;
}

export const registerUser = async (email: string, password: string): Promise<User> => {
  const { data, error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw new Error(error.message);
  }

  return { id: data.user!.id, email: data.user!.email! };
};

export const authenticateUser = async (email: string, password: string): Promise<{ token: string, supabaseToken: string }> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: data.user!.id, email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });

  return { token, supabaseToken: data.session!.access_token };
};
