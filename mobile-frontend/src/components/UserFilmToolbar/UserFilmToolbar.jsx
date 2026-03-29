import './UserFilmToolbar.css';
import { Bookmark, Star, Eye, Plus } from 'lucide-react'
import { useState } from 'react'

function UserFilmToolbar() {
  return (
    <div className="UserFilmToolbar">
      {/* {Bookmark} */}
      <button className="NavButton"><Bookmark className={`ToolbarIcon ${ true ? '' : ''}`} /></button>
      {/* {Rating} */}
      <button className="NavButton"><Star className={`ToolbarIcon ${ true ? '' : ''}`} /></button>
      {/* {Watched} */}
      <button className="NavButton"><Eye className={`ToolbarIcon ${ true ? '' : ''}`} /></button>
      {/* {Review} */}
      <button className="NavButton"><Plus className={`ToolbarIcon ${ true ? '' : ''}`} /></button>
    </div>
  );
}

export default UserFilmToolbar;
