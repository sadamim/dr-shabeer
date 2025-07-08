"use client";

import { useState, ReactElement } from 'react';
import {
  FaHeartbeat,
  FaLungs,
  FaStethoscope,
  FaWeight,
  FaBurn,
  FaTint
} from 'react-icons/fa';
import type { IconType } from 'react-icons';


type SymptomItem = {
  name: string;
  icon: IconType; // Instead of JSX.Element
};

type ResultType = {
  message: string;
  type: 'info' | 'warning' | 'danger';
};

const symptomsList: SymptomItem[] = [
  { name: "Fever", icon: FaBurn },
  { name: "Cough", icon: FaLungs },
  { name: "Abdominal Pain", icon: FaStethoscope },
  { name: "Bloating", icon: FaStethoscope },
  { name: "Nausea", icon: FaStethoscope },
  { name: "Vomiting", icon: FaStethoscope },
  { name: "Diarrhea", icon: FaStethoscope },
  { name: "Constipation", icon: FaStethoscope },
  { name: "Weight Loss", icon: FaWeight },
  { name: "Heartburn", icon: FaBurn },
  { name: "Fatigue", icon: FaHeartbeat },
  { name: "Blood in Stool", icon: FaTint }
];

export default function SymptomCheckerPage(): ReactElement {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<ResultType | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle');

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleCheck = () => {
    if (selectedSymptoms.length === 0) {
      setResult({ message: "Please select at least one symptom.", type: "info" });
      setStatus('done');
      return;
    }

    setStatus("loading");

    setTimeout(() => {
      let suggestion = "Your symptoms are common. Please monitor and consult a doctor if they persist.";
      let type: ResultType["type"] = "info";

      if (selectedSymptoms.includes("Abdominal Pain") && selectedSymptoms.includes("Bloating")) {
        suggestion = "You may be experiencing gastrointestinal discomfort. Consider seeing a gastroenterologist.";
        type = "warning";
      } else if (selectedSymptoms.includes("Blood in Stool")) {
        suggestion = "This could indicate a serious condition. Seek medical advice immediately.";
        type = "danger";
      }

      setResult({ message: suggestion, type });
      setStatus("done");
    }, 1200);
  };

  return (
    <div className="symptom-checker-wrapper">
      <div className="container">
        <h1 className="page-title mt-5">Symptomatic Checker</h1>
        <p className="intro-text">Select the symptoms you’re experiencing and get preliminary suggestions.</p>

        <div className="symptom-grid">
          {symptomsList.map(({ name, icon }, index) => (
            <button
              key={index}
              className={`symptom-btn ${selectedSymptoms.includes(name) ? 'active' : ''}`}
              onClick={() => toggleSymptom(name)}
            >
              <span className="symptom-icon">{icon && icon({})}</span>
              {name}
            </button>
          ))}
        </div>

        <button className="check-btn" onClick={handleCheck}>Check My Symptoms</button>

        {status === "loading" && (
          <div className="progress-bar">
            <div className="progress-fill" />
          </div>
        )}

        {status === "done" && result && (
          <div className={`result-box ${result.type}`}>
            <h4>Suggestion</h4>
            <p>{result.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
