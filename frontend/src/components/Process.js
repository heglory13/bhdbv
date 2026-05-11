import { ClipboardList, FileCheck, CreditCard, Users } from 'lucide-react';
import './Process.css';

const stepIcons = [
  <ClipboardList size={36} strokeWidth={1.5} color="white" />,
  <FileCheck    size={36} strokeWidth={1.5} color="white" />,
  <CreditCard   size={36} strokeWidth={1.5} color="white" />,
  <Users        size={36} strokeWidth={1.5} color="white" />,
];

const Process = ({ content = { steps: [] } }) => (
  <section className="process">
    <div className="process-container">
      <p className="process-eyebrow">{content.eyebrow}</p>
      <h2 className="process-heading">{content.heading}</h2>

      <div className="process-steps">
        {content.steps.map((step, i) => (
          <div className="process-step" key={i}>
            <div className="step-circle">
              <div className="step-icon">{stepIcons[i]}</div>
            </div>
            {i < content.steps.length - 1 && <div className="step-connector"></div>}
            <div className="step-content">
              <div className="step-number">{step.number}</div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
