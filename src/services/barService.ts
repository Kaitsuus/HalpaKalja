import { supabase } from '../lib/supaBaseClient';
import { Bar } from '@/interface/interface';

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

const addBar = async (bar: Bar) => {
  const existingBar = await getBarByNameLatLng(bar.name, bar.lat, bar.lng);

  if (existingBar) {
    return updateBar(existingBar.id, bar);
  }

  const { data, error } = await supabase
    .from('bars')
    .insert(bar)
    .single();

  if (error) throw error;
  return data;
};

const addOrUpdateBar = async (bar: Bar) => {
  const existingBar = await getBarByNameLatLng(bar.name, bar.lat, bar.lng);

  if (existingBar) {
    return updateBar(existingBar.id, bar);
  } else {
    const { data, error } = await supabase
      .from('bars')
      .insert(bar)
      .single();

    if (error) throw error;
    return data;
  }
};

const addOrUpdateBars = async (bars: Bar[]) => {
  const results = await Promise.all(bars.map(bar => addOrUpdateBar(bar)));
  return results;
};

const updateBar = async (id: string, bar: Bar) => {
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
  addOrUpdateBar, // Expose the function
  addOrUpdateBars, // Expose the function
  updateBar,
  deleteBar,
};
