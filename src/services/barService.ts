import { supabase } from '../lib/supaBaseClient';

const getBars = async () => {
  const { data, error } = await supabase
    .from('bars')
    .select('*');

  if (error) throw error;
  return data;
};

const getBarByNameLatLng = async (name: string, lat: number, lng: number) => {
  const { data, error } = await supabase
    .from('bars')
    .select('*')
    .eq('name', name)
    .eq('lat', lat)
    .eq('lng', lng);

  if (error) throw error;
  return data.length > 0 ? data[0] : null;
};

const getBarByName = async (name: string) => {
  const { data, error } = await supabase
    .from('bars')
    .select('*')
    .eq('name', name);

  if (error) throw error;
  return data.length > 0 ? data[0] : null;
};

const addBar = async (bar: any) => {
  const existingBar = await getBarByNameLatLng(bar.name, bar.lat, bar.lng);

  if (existingBar) {
    throw new Error('Bar with the same name, latitude, and longitude already exists');
  }

  const { data, error } = await supabase
    .from('bars')
    .insert(bar)
    .single();

  if (error) throw error;
  return data;
};

const updateBar = async (id: string, bar: any) => {
  const { data, error } = await supabase
    .from('bars')
    .update(bar)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

const deleteBar = async (id: string) => {
  const { error } = await supabase
    .from('bars')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

export const barsService = {
  getBars,
  getBarByName,
  getBarByNameLatLng,
  addBar,
  updateBar,
  deleteBar,
};
