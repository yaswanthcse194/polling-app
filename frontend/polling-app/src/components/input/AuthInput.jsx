import React, { useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const AuthInput = ({value, onChange, label, placeholder, type,}) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

  return (
    <div>
        <label className="text-[13px] test-slate-800">{label}</label>

        <div className="input-box">
            <input
                type={
                    type== "password" ? (showPassword ? "text" : "password") : "text"
                }
                placeholder={placeholder}
                className="w-full bg-transparent outline-none"
                value={value}
                onChange={(e) => onChange(e)}
            />

          {type == 'password' && (
            <>
            {showPassword ? (
            <FaRegEye
             size={22}
             className="text-[#06b6d4]  cursor-pointer"
             onClick={() => toggleShowPassword()}
            />
            ) : (
            <FaRegEyeSlash
            size={22}
            className="text-slate-400  cursor-pointer"
            onClick={() => toggleShowPassword()}
            />
            )}
          </>
          )}
        </div>
    </div>
  )
}

export default AuthInput
