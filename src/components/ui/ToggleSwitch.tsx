interface ToggleSwitchProps {
  isOn: boolean;
  onChange: (checked: boolean) => void;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, onChange }) => {
  return (
    <label className="flex items-center cursor-pointer relative" aria-label={isOn ? "Toggle on" : "Toggle off"}>
      <input 
        type="checkbox"
        checked={isOn}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
        role="switch"
        aria-checked={isOn}
      />
      <div 
        className={`w-10 h-5 flex items-center rounded-full transition-colors duration-300 shadow-sm ${
          isOn ? 'bg-[#136682]' : 'bg-gray-300'
        }`}
        style={{ position: 'relative' }}
      >
        <div 
          className="w-3 h-3 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center"
          aria-hidden="true"
          style={{
            transform: isOn ? 'translateX(22px)' : 'translateX(6px)', 
          }}
        />
      </div>
    </label>
  );
};

export default ToggleSwitch;