import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8 max-w-lg mx-auto text-center">
      <div className="relative">
        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-full p-8 shadow-lg">
          <NotebookIcon className="size-12 text-blue-600" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-3xl font-bold text-gray-900">No notes yet</h3>
        <p className="text-gray-600 text-lg leading-relaxed">
          Ready to organize your thoughts? Create your first note to get started
          on your journey.
        </p>
      </div>
      <Link 
        to="/create" 
        className="btn-modern"
      >
        <NotebookIcon className="size-5" />
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
