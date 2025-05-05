import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaSearch,
  FaUser,
  FaFileAudio,
  FaImage,
  FaLink,
} from "react-icons/fa";
import "./SearchPage.css";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false); // ✅ control search state

  const [mediaFilter, setMediaFilter] = useState("image"); // default
  const [licenseFilter, setLicenseFilter] = useState("all");

  const { authAxios } = useAuth();

  // 🔍 Central Fetch Function
  const fetchResults = useCallback(
    async (term, media = mediaFilter) => {
      if (!term.trim()) return;

      setLoading(true);
      setError(null);
      setResults([]);

      try {
        const params = new URLSearchParams({ q: term });
        if (media !== "all") params.append("content_type", media);

        const { data } = await authAxios.get(
          `/search/openverse?${params.toString()}`
        );

        setResults(data?.results || []);
      } catch (err) {
        setError(
          err.response?.data?.details ||
            err.message ||
            "Failed to fetch search results."
        );
      } finally {
        setLoading(false);
      }
    },
    [authAxios, mediaFilter]
  );

  // 🔍 Manual Search Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSearched(true);
    fetchResults(searchTerm);
  };

  // 🔁 Trigger filter update ONLY after search
  useEffect(() => {
    if (hasSearched && searchTerm) {
      fetchResults(searchTerm, mediaFilter);
    }
  }, [mediaFilter, fetchResults, searchTerm, hasSearched]);

  // 🎯 License Filter (Client-side)
  const filtered = useMemo(() => {
    return results.filter((r) =>
      licenseFilter === "all"
        ? true
        : licenseFilter === "pd"
        ? r.license === "cc0"
        : r.license.startsWith(licenseFilter)
    );
  }, [results, licenseFilter]);

  return (
    <div className="search-layout">
      {/* ─── Search Panel ─── */}
      <div className="search-panel">
        <h2 className="search-title">
          <FaSearch /> Search Openverse
        </h2>

        <form onSubmit={handleSubmit} className="search-form">
          <input
            className="search-input"
            placeholder="Search for images, audio…"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            required
          />
          <button className="search-btn" disabled={isLoading}>
            <FaSearch />
          </button>
        </form>

        {/* 🎛 Media Type Filter */}
        <div className="filter-group">
          <span className="filter-label">Media Type:</span>
          {["image", "audio", "all"].map((type) => (
            <button
              key={type}
              className={`filter-btn ${mediaFilter === type ? "active" : ""}`}
              onClick={() => setMediaFilter(type)}
            >
              {type === "all"
                ? "All"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* 🏷 License Filter */}
        <div className="filter-group">
          <span className="filter-label">License:</span>
          {[
            { code: "all", label: "All" },
            { code: "pd", label: "Public Domain" },
            { code: "by", label: "CC-BY" },
            { code: "by-sa", label: "CC-BY-SA" },
          ].map(({ code, label }) => (
            <button
              key={code}
              className={`filter-btn ${licenseFilter === code ? "active" : ""}`}
              onClick={() => setLicenseFilter(code)}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ❌ Error */}
        {error && <p className="error-text">Error: {error}</p>}

        {/* 🔍 Info */}
        {!isLoading && results.length === 0 && hasSearched && !error && (
          <p className="no-results">No results found.</p>
        )}
        {!hasSearched && (
          <p className="no-results">Enter a term and click Search to begin.</p>
        )}
      </div>

      {/* ─── Results Grid ─── */}
      <div className="results-panel">
        {isLoading ? (
          <p className="loading-text">Loading results…</p>
        ) : (
          filtered.map((item) => (
            <div key={item.id} className="search-card">
              {/* 📷 Thumbnail or 🎵 Audio */}
              {item.frontend_media_type === "image" ? (
                <img
                  src={
                    item.thumbnail_url || item.thumbnail || item.url || ""
                  }
                  alt={item.title || "Image"}
                  className="card-thumb"
                />
              ) : (
                <div className="card-thumb audio-thumb">
                  <FaFileAudio />
                </div>
              )}

              {/* ℹ Info */}
              <div className="card-meta">
                <p className="meta-row">
                  <FaImage /> <strong>Title:</strong>{" "}
                  {item.title || "Untitled"}
                </p>
                <p className="meta-row">
                  <FaUser /> <strong>Creator:</strong>{" "}
                  {item.creator || "Unknown"}
                </p>
                <p className="meta-row">
                  <strong>License:</strong>{" "}
                  <a
                    href={item.license_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.license} {item.license_version}
                  </a>
                </p>
                {item.foreign_landing_url && (
                  <p className="meta-row">
                    <FaLink />{" "}
                    <a
                      href={item.foreign_landing_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Source
                    </a>
                  </p>
                )}
                {item.frontend_media_type === "audio" && (
                  <audio
                    controls
                    src={item.url}
                    className="w-full mt-2 rounded-md"
                  />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
