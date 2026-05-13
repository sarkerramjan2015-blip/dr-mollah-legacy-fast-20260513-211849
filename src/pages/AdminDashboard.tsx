import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';
import { LogOut, Plus, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type Activity = {
  id: number;
  title: string;
  desc: string;
  date: string;
  img: string;
};

const getErrorMessage = (error: unknown, fallback: string) => (
  error instanceof Error ? error.message : fallback
);

export function AdminDashboard() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState('');
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data, error } = await supabase.from('activities').select('*').order('id', { ascending: false });
      if (error) throw error;
      setActivities((data || []) as Activity[]);
    } catch (error) {
      toast.error(getErrorMessage(error, 'Failed to load activities'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from('portfolio-images').getPublicUrl(filePath);
      setImgUrl(data.publicUrl);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      toast.error(getErrorMessage(error, 'Error uploading image'));
    } finally {
      setUploading(false);
    }
  };

  const handleAddActivity = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('activities').insert([
        { title, desc, date, img: imgUrl }
      ]);
      if (error) throw error;
      toast.success('Activity added successfully!');
      setTitle(''); setDesc(''); setDate(''); setImgUrl('');
      fetchActivities();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Error adding activity'));
    }
  };

  const handleDeleteActivity = async (id: number) => {
    try {
      const { error } = await supabase.from('activities').delete().eq('id', id);
      if (error) throw error;
      toast.success('Activity deleted successfully!');
      fetchActivities();
    } catch (error) {
      toast.error(getErrorMessage(error, 'Error deleting activity'));
    }
  };

  return (
    <div className="min-h-screen bg-[#04060b] text-slate-300 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-white">Admin Dashboard</h1>
          <button type="button" onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Add Activity Form */}
          <div className="md:col-span-1 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl h-fit">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Add Activity</h2>
            <form onSubmit={handleAddActivity} className="space-y-4">
              <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-3 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none" required />
              <input type="text" placeholder="Date (e.g., Oct 15, 2023)" value={date} onChange={e => setDate(e.target.value)} className="w-full p-3 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none" required />
              <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="w-full p-3 rounded-xl bg-[#04060b]/50 border border-white/10 text-white focus:border-[#C9A227] outline-none resize-none" rows={3} required />
              
              <div>
                <label className="block text-sm text-slate-400 mb-2">Upload Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#C9A227] file:text-[#04060b] hover:file:bg-[#FFD700]" />
                {uploading && <p className="text-xs text-[#C9A227] mt-2">Uploading...</p>}
                {imgUrl && <img src={imgUrl} alt="Preview" className="mt-4 w-full h-32 object-cover rounded-xl" />}
              </div>

              <button type="submit" className="w-full py-3 bg-[#C9A227] text-[#04060b] rounded-xl font-bold hover:bg-[#FFD700] transition-colors flex items-center justify-center gap-2">
                <Plus size={18} /> Add Activity
              </button>
            </form>
          </div>

          {/* Activities List */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
            <h2 className="text-2xl font-serif font-bold text-white mb-6">Manage Activities</h2>
            {loading ? (
              <p>Loading activities...</p>
            ) : (
              <div className="space-y-4">
                {activities.map(activity => (
                  <div key={activity.id} className="flex items-center gap-4 bg-[#04060b]/50 p-4 rounded-xl border border-white/5">
                    <img src={activity.img} alt={activity.title} className="w-20 h-20 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{activity.title}</h3>
                      <p className="text-sm text-slate-400">{activity.date}</p>
                    </div>
                    <button type="button" aria-label={`Delete ${activity.title}`} onClick={() => handleDeleteActivity(activity.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
