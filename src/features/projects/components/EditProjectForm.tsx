"use client";

import { useEditProject } from "@/features/projects/hooks/useEditProject";
import { FaCloudUploadAlt, FaTimes, FaStar, FaFilm } from "react-icons/fa";

interface EditProjectFormProps {
  uuid: string;
}

export default function EditProjectForm({ uuid }: EditProjectFormProps) {
  const {
    title, setTitle,
    shortDescription, setShortDescription,
    fullDescription, setFullDescription,
    githubUrl, setGithubUrl,
    liveUrl, setLiveUrl,
    featured, setFeatured,
    availableTechs, selectedTechs, toggleTech,
    existingMedia, newFiles,
    mainMediaIndex, setMainMediaIndex,
    handleAddFiles, handleRemoveExistingMedia, handleRemoveNewFile,
    isLoading, isSubmitting, handleSubmit,
    router
  } = useEditProject(uuid);

  if (isLoading) {
    return <div className="p-8 text-center text-slate-400">Loading project data...</div>;
  }

  const totalMediaLength = existingMedia.length + newFiles.length;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 p-2">
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="text-slate-300 text-sm font-bold block mb-1">Title</label>
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
            className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-slate-300 text-sm font-bold block mb-1">Short Description</label>
          <input 
            value={shortDescription} 
            onChange={(e) => setShortDescription(e.target.value)} 
            required 
            maxLength={500} 
            className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
          />
        </div>
        <div className="md:col-span-2">
          <label className="text-slate-300 text-sm font-bold block mb-1">Full Description</label>
          <textarea 
            value={fullDescription} 
            onChange={(e) => setFullDescription(e.target.value)} 
            required 
            rows={4} 
            className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" 
          />
        </div>
        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">GitHub URL</label>
          <input 
            value={githubUrl} 
            onChange={(e) => setGithubUrl(e.target.value)} 
            type="url" 
            className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary outline-none transition-all" 
          />
        </div>
        <div>
          <label className="text-slate-300 text-sm font-bold block mb-1">Live URL</label>
          <input 
            value={liveUrl} 
            onChange={(e) => setLiveUrl(e.target.value)} 
            type="url" 
            className="w-full p-3 bg-slate-800 text-white rounded-xl border border-slate-700 focus:border-primary outline-none transition-all" 
          />
        </div>
      </div>

      <div className="bg-slate-800/40 p-5 rounded-xl border border-slate-700">
        <label className="text-slate-300 text-sm font-bold flex items-center gap-3 cursor-pointer">
          <input 
            type="checkbox" 
            checked={featured} 
            onChange={(e) => setFeatured(e.target.checked)} 
            className="w-5 h-5 rounded text-primary focus:ring-primary bg-slate-900 border-slate-600" 
          />
          Featured Project
        </label>
      </div>

      <div>
        <label className="text-slate-300 text-sm font-bold block mb-3">Technologies</label>
        <div className="flex flex-wrap gap-2">
          {availableTechs.map((tech) => (
            <button
              type="button" 
              key={tech.uuid} 
              onClick={() => toggleTech(tech.uuid)}
              className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-300 ${
                selectedTechs.includes(tech.uuid)
                  ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500 hover:text-white'
              }`}
            >
              {tech.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <label className="text-slate-300 text-sm font-bold block">Media Files</label>
        
        <div className="relative group w-full flex justify-center items-center p-8 border-2 border-dashed border-slate-600 hover:border-primary rounded-2xl bg-slate-800/30 hover:bg-slate-800/50 transition-all cursor-pointer">
          <input 
            type="file" 
            multiple 
            accept="image/*,video/*" 
            onChange={(e) => handleAddFiles(e.target.files)} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
          />
          <div className="text-center flex flex-col items-center pointer-events-none">
            <FaCloudUploadAlt className="text-5xl text-slate-500 group-hover:text-primary mb-3 transition-colors" />
            <p className="text-slate-300 font-medium">Click or drag files here</p>
          </div>
        </div>

        {totalMediaLength > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            
            {existingMedia.map((media, index) => {
              const isVideo = media.mediaType.startsWith('video');
              const isMain = mainMediaIndex === index;

              return (
                <div key={media.uuid} className={`relative group aspect-video rounded-xl overflow-hidden border-2 transition-all ${isMain ? 'border-primary' : 'border-slate-700 hover:border-slate-500'}`}>
                  {isVideo ? (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                      <video src={media.url} className="w-full h-full object-cover opacity-80" />
                      <FaFilm className="absolute text-3xl text-white/70" />
                    </div>
                  ) : (
                    <img src={media.url} alt="media" className="w-full h-full object-cover" />
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <button type="button" onClick={() => handleRemoveExistingMedia(index)} className="self-end p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors">
                      <FaTimes size={12} />
                    </button>
                    <button type="button" onClick={() => setMainMediaIndex(index)} className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-xs font-bold transition-colors ${isMain ? 'bg-primary text-slate-900' : 'bg-slate-700/80 text-white'}`}>
                      <FaStar size={10} className={isMain ? 'text-slate-900' : 'text-primary'} />
                      Cover
                    </button>
                  </div>
                  {isMain && <div className="absolute top-2 left-2 bg-primary text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full group-hover:hidden">COVER</div>}
                </div>
              );
            })}

            {newFiles.map((file, index) => {
              const adjustedIndex = existingMedia.length + index;
              const isVideo = file.type.startsWith('video');
              const objectUrl = URL.createObjectURL(file);
              const isMain = mainMediaIndex === adjustedIndex;

              return (
                <div key={`new-${index}`} className={`relative group aspect-video rounded-xl overflow-hidden border-2 transition-all ${isMain ? 'border-primary' : 'border-slate-700 hover:border-slate-500'}`}>
                  {isVideo ? (
                    <div className="w-full h-full bg-slate-900 flex items-center justify-center relative">
                      <video src={objectUrl} className="w-full h-full object-cover opacity-80" />
                      <FaFilm className="absolute text-3xl text-white/70" />
                    </div>
                  ) : (
                    <img src={objectUrl} alt="preview" className="w-full h-full object-cover" />
                  )}

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                    <button type="button" onClick={() => handleRemoveNewFile(index)} className="self-end p-1.5 bg-red-500/80 hover:bg-red-500 text-white rounded-full transition-colors">
                      <FaTimes size={12} />
                    </button>
                    <button type="button" onClick={() => setMainMediaIndex(adjustedIndex)} className={`flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-xs font-bold transition-colors ${isMain ? 'bg-primary text-slate-900' : 'bg-slate-700/80 text-white'}`}>
                      <FaStar size={10} className={isMain ? 'text-slate-900' : 'text-primary'} />
                      Cover
                    </button>
                  </div>
                  {isMain && <div className="absolute top-2 left-2 bg-primary text-slate-900 text-[10px] font-extrabold px-2 py-0.5 rounded-full group-hover:hidden">COVER</div>}
                </div>
              );
            })}

          </div>
        )}
      </div>

      <div className="border-t border-slate-700 pt-6 flex gap-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="w-1/3 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-2/3 bg-primary hover:bg-primary/90 disabled:bg-slate-700 text-slate-950 disabled:text-slate-400 font-bold py-3 rounded-lg transition-colors shadow-lg"
        >
          {isSubmitting ? "Saving..." : "Save Changes"}
        </button>
      </div>

    </form>
  );
}
