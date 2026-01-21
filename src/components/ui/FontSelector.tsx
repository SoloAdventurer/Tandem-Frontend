// FontSelector.tsx
import { useFont } from "../../providers/FontProvider";
import { fontOptions } from "../../config/fonts";

const FontSelector = () => {
  const { englishFont, arabicFont, setEnglishFont, setArabicFont } = useFont();

  return (
    <div
      className="p-6 rounded-lg"
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <h3 className="text-xl font-semibold mb-4">Typography</h3>

      {/* English Font */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-3">English Font</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fontOptions.english.map((font) => (
            <button
              key={font.value}
              onClick={() => setEnglishFont(font.value)}
              className="p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{
                fontFamily: font.value,
                borderColor:
                  englishFont === font.value
                    ? "var(--accent)"
                    : "var(--border-primary)",
                backgroundColor:
                  englishFont === font.value
                    ? "var(--accent-light)"
                    : "var(--bg-tertiary)",
              }}
            >
              <div className="text-lg mb-1">Aa</div>
              <div className="text-xs">{font.name}</div>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div
          className="mt-3 p-3 rounded border"
          style={{
            fontFamily: englishFont,
            backgroundColor: "var(--bg-tertiary)",
            borderColor: "var(--border-primary)",
          }}
        >
          <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
        </div>
      </div>

      {/* Arabic Font */}
      <div>
        <label className="block text-sm font-medium mb-3">
          Arabic Font (الخط العربي)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {fontOptions.arabic.map((font) => (
            <button
              key={font.value}
              onClick={() => setArabicFont(font.value)}
              className="p-4 rounded-lg border-2 transition-all hover:scale-105"
              style={{
                fontFamily: font.value,
                borderColor:
                  arabicFont === font.value
                    ? "var(--accent)"
                    : "var(--border-primary)",
                backgroundColor:
                  arabicFont === font.value
                    ? "var(--accent-light)"
                    : "var(--bg-tertiary)",
              }}
            >
              <div className="text-lg mb-1">أ ب</div>
              <div className="text-xs">{font.name}</div>
            </button>
          ))}
        </div>

        {/* Preview */}
        <div
          className="mt-3 p-3 rounded border"
          style={{
            fontFamily: arabicFont,
            backgroundColor: "var(--bg-tertiary)",
            borderColor: "var(--border-primary)",
          }}
        >
          <p className="text-sm" dir="rtl">
            بسم الله الرحمن الرحيم
          </p>
        </div>
      </div>
    </div>
  );
};

export default FontSelector;
