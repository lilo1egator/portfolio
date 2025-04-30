import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Tabs = ({ tabs, activeTab, onChange }) => (
  <motion.div
    className="projects__tabs"
    role="tablist"
    aria-label="Project categories"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.7 }}
    transition={{ duration: 0.7, ease: [0.77, 0, 0.18, 1] }}
  >
    {tabs.map(tab => (
      <button
        key={tab.value}
        className={`projects__tab${activeTab === tab.value ? ' projects__tab--active' : ''}`}
        onClick={() => onChange(tab.value)}
        type="button"
        role="tab"
        aria-selected={activeTab === tab.value}
        tabIndex={activeTab === tab.value ? 0 : -1}
      >
        {tab.label}
        {activeTab === tab.value && (
          <motion.span layoutId="tab-underline" className="projects__tab-underline" />
        )}
      </button>
    ))}
  </motion.div>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Tabs; 