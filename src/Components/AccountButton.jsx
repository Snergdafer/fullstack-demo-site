import { useState } from "react";

const AccountButton = ({ handleLogout }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  return (
    <div class="relative inline-block text-left">
      <button
        onClick={() => setMenuVisible(!menuVisible)}
        className="rounded-full h-12 w-12 pt-1"
      >
        <span class="material-icons">person</span>
      </button>

      {menuVisible && (
        <div
          class="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabindex="-1"
        >
          <div class="py-1" role="none">
            <span
              class="block w-full px-4 py-2 text-left text-sm text-black"
              onClick={handleLogout}
            >
              Sign out
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountButton;
