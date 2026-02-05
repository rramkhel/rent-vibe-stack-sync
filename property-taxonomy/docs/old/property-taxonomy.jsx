import React, { useState } from 'react';

const PropertyTaxonomyProposal = () => {
  const [activeView, setActiveView] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Simplified user-facing categories (what renters see)
  const renterView = [
    { id: 'apartments', label: 'Apartments', icon: '🏢', color: '#3B82F6' },
    { id: 'houses', label: 'Houses', icon: '🏠', color: '#10B981' },
    { id: 'condos', label: 'Condos', icon: '🏙️', color: '#8B5CF6' },
    { id: 'rooms', label: 'Rooms', icon: '🛏️', color: '#F59E0B' },
    { id: 'townhouses', label: 'Townhouses', icon: '🏘️', color: '#EC4899' },
  ];

  // What ecommerce landlords see (slightly more detail)
  const ecommerceView = {
    apartments: ['Studio', 'Basement', 'Main Floor', 'Loft'],
    houses: ['Single-family', 'Semi-detached', 'Duplex/Triplex'],
    condos: ['Condo Unit'],
    rooms: ['Private Room', 'Shared Room'],
    townhouses: ['Townhouse'],
  };

  // Full enterprise taxonomy (what data sees + enterprise landlords)
  const enterpriseView = {
    apartments: {
      'Low Rise': ['Studio', 'Bachelor', 'Basement', 'Main Floor', 'Loft', 'Duplex Unit'],
      'Mid Rise': ['Studio', 'Bachelor', 'Basement', 'Main Floor', 'Loft', 'Duplex Unit'],
      'High Rise': ['Studio', 'Bachelor', 'Basement', 'Main Floor', 'Loft', 'Duplex Unit', 'Penthouse'],
      'Luxury': ['Studio', 'Bachelor', 'Penthouse', 'Loft'],
    },
    houses: {
      'Single-family': ['House', 'Single-family Home', 'Cabin', 'Cottage', 'Garden Home'],
      'Semi-detached': ['Semi House'],
      'Multi-unit': ['Duplex', 'Triplex', 'Fourplex', 'Multiplex'],
      'Other': ['Mobile Home', 'Garage Suite'],
    },
    condos: {
      'Condo Building': ['Condo Unit'],
      'Condo Community': ['Condo Unit'],
    },
    rooms: {
      'Private': ['Private Room'],
      'Shared': ['Shared Room'],
      'Rooming House': ['Room'],
    },
    townhouses: {
      'Single Unit': ['Townhouse'],
      'Community': ['Townhouse Unit'],
    },
  };

  // Housing type overlays (cross-cutting)
  const housingTypes = [
    'Family/Conventional',
    'Student',
    'Senior',
    'Corporate',
    'Military/Veteran',
    'Vacation',
    'Sublet',
    'Short-term',
  ];

  const renderOverview = () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#1E293B',
        marginBottom: '8px',
        fontFamily: 'Georgia, serif'
      }}>
        Proposed Architecture: Progressive Disclosure Model
      </h2>
      <p style={{ color: '#64748B', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
        One backend taxonomy, three frontend views. Each user sees only the complexity they need.
      </p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr', 
        gap: '16px',
      }}>
        {/* The funnel diagram */}
        <div style={{
          background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {/* Renter layer */}
            <div style={{
              background: '#DBEAFE',
              border: '2px solid #3B82F6',
              borderRadius: '12px',
              padding: '16px',
              width: '180px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '12px', color: '#1E40AF', fontWeight: '600', marginBottom: '4px' }}>
                RENTER VIEW
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#1E40AF' }}>5</div>
              <div style={{ fontSize: '11px', color: '#3B82F6' }}>categories</div>
              <div style={{ 
                marginTop: '8px', 
                fontSize: '10px', 
                color: '#64748B',
                background: 'white',
                padding: '6px',
                borderRadius: '6px',
              }}>
                Apartments • Houses • Condos • Rooms • Townhouses
              </div>
            </div>

            {/* Ecommerce layer */}
            <div style={{
              background: '#D1FAE5',
              border: '2px solid #10B981',
              borderRadius: '12px',
              padding: '16px',
              width: '180px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '12px', color: '#065F46', fontWeight: '600', marginBottom: '4px' }}>
                ECOMMERCE VIEW
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#065F46' }}>~12</div>
              <div style={{ fontSize: '11px', color: '#10B981' }}>property types</div>
              <div style={{ 
                marginTop: '8px', 
                fontSize: '10px', 
                color: '#64748B',
                background: 'white',
                padding: '6px',
                borderRadius: '6px',
              }}>
                Intuitive subtypes shown contextually after category selection
              </div>
            </div>

            {/* Enterprise layer */}
            <div style={{
              background: '#EDE9FE',
              border: '2px solid #8B5CF6',
              borderRadius: '12px',
              padding: '16px',
              width: '180px',
              textAlign: 'center',
            }}>
              <div style={{ fontSize: '12px', color: '#5B21B6', fontWeight: '600', marginBottom: '4px' }}>
                ENTERPRISE VIEW
              </div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#5B21B6' }}>40+</div>
              <div style={{ fontSize: '11px', color: '#8B5CF6' }}>full taxonomy</div>
              <div style={{ 
                marginTop: '8px', 
                fontSize: '10px', 
                color: '#64748B',
                background: 'white',
                padding: '6px',
                borderRadius: '6px',
              }}>
                Category → Building Type → Unit Type (3-level hierarchy)
              </div>
            </div>
          </div>

          {/* Arrows */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '16px',
            fontSize: '11px',
            color: '#94A3B8',
          }}>
            ← Less complexity for casual users | Full detail for power users →
          </div>
        </div>

        {/* Key insight */}
        <div style={{
          background: '#FFFBEB',
          border: '1px solid #FCD34D',
          borderRadius: '8px',
          padding: '16px',
        }}>
          <div style={{ fontWeight: '600', color: '#92400E', marginBottom: '8px', fontSize: '13px' }}>
            💡 Key Insight
          </div>
          <p style={{ fontSize: '13px', color: '#78350F', margin: 0, lineHeight: '1.5' }}>
            The <strong>backend stores the full taxonomy</strong> (enterprise level) for data accuracy and Rent Report quality.
            The <strong>frontend progressively reveals</strong> based on user type. All selections map to the same backend codes.
          </p>
        </div>
      </div>
    </div>
  );

  const renderRenterView = () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#1E293B',
        marginBottom: '4px',
        fontFamily: 'Georgia, serif'
      }}>
        Renter Search Experience
      </h2>
      <p style={{ color: '#64748B', marginBottom: '20px', fontSize: '13px' }}>
        5 clear categories. No cognitive overload. Filters refine from there.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '12px',
        marginBottom: '20px',
      }}>
        {renterView.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
            style={{
              background: selectedCategory === cat.id ? cat.color : 'white',
              border: `2px solid ${cat.color}`,
              borderRadius: '12px',
              padding: '16px 8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '24px' }}>{cat.icon}</span>
            <span style={{ 
              fontSize: '12px', 
              fontWeight: '600',
              color: selectedCategory === cat.id ? 'white' : cat.color,
            }}>
              {cat.label}
            </span>
          </button>
        ))}
      </div>

      {selectedCategory && (
        <div style={{
          background: '#F8FAFC',
          borderRadius: '8px',
          padding: '16px',
          border: '1px solid #E2E8F0',
        }}>
          <div style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px' }}>
            After selecting "{renterView.find(c => c.id === selectedCategory)?.label}", renters see optional refinement filters:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {ecommerceView[selectedCategory]?.map(type => (
              <span key={type} style={{
                background: 'white',
                border: '1px solid #CBD5E1',
                borderRadius: '16px',
                padding: '4px 12px',
                fontSize: '12px',
                color: '#475569',
              }}>
                {type}
              </span>
            ))}
            <span style={{
              background: '#FEF3C7',
              border: '1px solid #FCD34D',
              borderRadius: '16px',
              padding: '4px 12px',
              fontSize: '12px',
              color: '#92400E',
            }}>
              + price, beds, pet-friendly, etc.
            </span>
          </div>
        </div>
      )}

      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: '#F0FDF4',
        borderRadius: '8px',
        border: '1px solid #BBF7D0',
      }}>
        <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>
          ✓ Addresses Renter Need
        </div>
        <div style={{ fontSize: '12px', color: '#15803D', marginTop: '4px' }}>
          Simple mental model. Pick a category, refine with filters. No 40-item dropdown.
        </div>
      </div>
    </div>
  );

  const renderEcommerceView = () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#1E293B',
        marginBottom: '4px',
        fontFamily: 'Georgia, serif'
      }}>
        Ecommerce Landlord Listing Flow
      </h2>
      <p style={{ color: '#64748B', marginBottom: '20px', fontSize: '13px' }}>
        Two-step selection: Category → Type. Smart defaults reduce decisions.
      </p>

      <div style={{
        display: 'flex',
        gap: '16px',
        alignItems: 'flex-start',
      }}>
        {/* Step 1 */}
        <div style={{ flex: 1 }}>
          <div style={{
            background: '#DBEAFE',
            color: '#1E40AF',
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '8px',
          }}>
            STEP 1
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
            "What type of property?"
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {renterView.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: selectedCategory === cat.id ? cat.color : 'white',
                  color: selectedCategory === cat.id ? 'white' : '#374151',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  padding: '10px 12px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: '#CBD5E1',
          fontSize: '24px',
          paddingTop: '60px',
        }}>
          →
        </div>

        {/* Step 2 */}
        <div style={{ flex: 1 }}>
          <div style={{
            background: '#D1FAE5',
            color: '#065F46',
            padding: '6px 12px',
            borderRadius: '16px',
            fontSize: '11px',
            fontWeight: '600',
            display: 'inline-block',
            marginBottom: '8px',
          }}>
            STEP 2
          </div>
          <div style={{ fontSize: '13px', fontWeight: '600', color: '#1E293B', marginBottom: '8px' }}>
            "More specifically?"
          </div>
          {selectedCategory ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {ecommerceView[selectedCategory]?.map((type, i) => (
                <div
                  key={type}
                  style={{
                    background: i === 0 ? '#F0FDF4' : 'white',
                    border: i === 0 ? '2px solid #10B981' : '1px solid #E5E7EB',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    fontSize: '13px',
                    color: '#374151',
                  }}
                >
                  {type} {i === 0 && <span style={{ fontSize: '10px', color: '#10B981' }}>(default)</span>}
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              background: '#F8FAFC',
              border: '1px dashed #CBD5E1',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              color: '#94A3B8',
              fontSize: '12px',
            }}>
              Select a category first
            </div>
          )}
        </div>
      </div>

      <div style={{
        marginTop: '20px',
        padding: '12px',
        background: '#F0FDF4',
        borderRadius: '8px',
        border: '1px solid #BBF7D0',
      }}>
        <div style={{ fontSize: '12px', color: '#166534', fontWeight: '600' }}>
          ✓ Addresses Ecommerce Landlord Need
        </div>
        <div style={{ fontSize: '12px', color: '#15803D', marginTop: '4px' }}>
          Fast 2-click selection with sensible defaults. If they don't know/care about "Low vs Mid Rise", they just pick "Apartment" and move on.
        </div>
      </div>
    </div>
  );

  const renderEnterpriseView = () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#1E293B',
        marginBottom: '4px',
        fontFamily: 'Georgia, serif'
      }}>
        Enterprise & Data Full Taxonomy
      </h2>
      <p style={{ color: '#64748B', marginBottom: '16px', fontSize: '13px' }}>
        Three-level hierarchy. All niche types available. This is the source of truth.
      </p>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '12px',
        fontSize: '11px',
      }}>
        {Object.entries(enterpriseView).slice(0, 3).map(([category, buildingTypes]) => (
          <div key={category} style={{
            background: '#F8FAFC',
            borderRadius: '8px',
            padding: '12px',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{ 
              fontWeight: '700', 
              color: renterView.find(c => c.id === category)?.color,
              marginBottom: '8px',
              textTransform: 'uppercase',
              fontSize: '10px',
              letterSpacing: '0.5px',
            }}>
              {renterView.find(c => c.id === category)?.icon} {category}
            </div>
            {Object.entries(buildingTypes).map(([buildingType, unitTypes]) => (
              <div key={buildingType} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: '600', color: '#475569', marginBottom: '4px' }}>
                  └ {buildingType}
                </div>
                <div style={{ paddingLeft: '12px', color: '#94A3B8' }}>
                  {unitTypes.slice(0, 3).map(ut => (
                    <div key={ut}>└ {ut}</div>
                  ))}
                  {unitTypes.length > 3 && <div>└ +{unitTypes.length - 3} more...</div>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Housing types overlay */}
      <div style={{
        marginTop: '16px',
        background: '#FEF3C7',
        borderRadius: '8px',
        padding: '12px',
        border: '1px solid #FCD34D',
      }}>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#92400E', marginBottom: '8px' }}>
          + HOUSING TYPE OVERLAY (cross-cutting)
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {housingTypes.map(ht => (
            <span key={ht} style={{
              background: 'white',
              border: '1px solid #FCD34D',
              borderRadius: '12px',
              padding: '2px 8px',
              fontSize: '10px',
              color: '#78350F',
            }}>
              {ht}
            </span>
          ))}
        </div>
      </div>

      <div style={{
        marginTop: '16px',
        padding: '12px',
        background: '#EDE9FE',
        borderRadius: '8px',
        border: '1px solid #C4B5FD',
      }}>
        <div style={{ fontSize: '12px', color: '#5B21B6', fontWeight: '600' }}>
          ✓ Addresses Enterprise + Data Needs
        </div>
        <div style={{ fontSize: '12px', color: '#6D28D9', marginTop: '4px' }}>
          Full granularity for portfolio management, accurate Rent Report aggregation, and clean data logging. 
          Housing types are a separate dimension (can filter/tag any property type).
        </div>
      </div>
    </div>
  );

  const renderDataModel = () => (
    <div style={{ padding: '24px' }}>
      <h2 style={{ 
        fontSize: '20px', 
        fontWeight: '600', 
        color: '#1E293B',
        marginBottom: '4px',
        fontFamily: 'Georgia, serif'
      }}>
        Proposed Data Model
      </h2>
      <p style={{ color: '#64748B', marginBottom: '16px', fontSize: '13px' }}>
        How it stores in the backend to satisfy Data team requirements.
      </p>

      <div style={{
        background: '#1E293B',
        borderRadius: '8px',
        padding: '16px',
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#E2E8F0',
        overflow: 'auto',
      }}>
        <div style={{ color: '#94A3B8' }}>// Backend property record</div>
        <div>{'{'}</div>
        <div style={{ paddingLeft: '16px' }}>
          <span style={{ color: '#7DD3FC' }}>"property_category"</span>: <span style={{ color: '#FCD34D' }}>"residential_mf"</span>,
        </div>
        <div style={{ paddingLeft: '16px' }}>
          <span style={{ color: '#7DD3FC' }}>"building_type"</span>: <span style={{ color: '#FCD34D' }}>"high_rise_apartment"</span>,
        </div>
        <div style={{ paddingLeft: '16px' }}>
          <span style={{ color: '#7DD3FC' }}>"unit_type"</span>: <span style={{ color: '#FCD34D' }}>"loft"</span>,
        </div>
        <div style={{ paddingLeft: '16px' }}>
          <span style={{ color: '#7DD3FC' }}>"housing_type"</span>: <span style={{ color: '#FCD34D' }}>"student"</span>,
        </div>
        <div style={{ paddingLeft: '16px', color: '#94A3B8' }}>
          // Derived for frontend display:
        </div>
        <div style={{ paddingLeft: '16px' }}>
          <span style={{ color: '#7DD3FC' }}>"display_category"</span>: <span style={{ color: '#FCD34D' }}>"Apartments"</span>,
        </div>
        <div style={{ paddingLeft: '16px' }}>
          <span style={{ color: '#7DD3FC' }}>"display_type"</span>: <span style={{ color: '#FCD34D' }}>"Loft"</span>
        </div>
        <div>{'}'}</div>
      </div>

      <div style={{ 
        marginTop: '16px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      }}>
        <div style={{
          background: '#F0FDF4',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid #BBF7D0',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#166534', marginBottom: '6px' }}>
            ✓ Accurate & Clean
          </div>
          <ul style={{ fontSize: '11px', color: '#15803D', margin: 0, paddingLeft: '16px' }}>
            <li>Normalized IDs, not free text</li>
            <li>3-level hierarchy prevents ambiguity</li>
            <li>Housing type as separate dimension</li>
          </ul>
        </div>
        <div style={{
          background: '#F0FDF4',
          borderRadius: '8px',
          padding: '12px',
          border: '1px solid #BBF7D0',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#166534', marginBottom: '6px' }}>
            ✓ Rent Report Ready
          </div>
          <ul style={{ fontSize: '11px', color: '#15803D', margin: 0, paddingLeft: '16px' }}>
            <li>Aggregate by any level</li>
            <li>Filter by housing type</li>
            <li>No data cleanup needed</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'renter', label: 'Renter View' },
    { id: 'ecommerce', label: 'Ecommerce LL' },
    { id: 'enterprise', label: 'Enterprise + Data' },
    { id: 'datamodel', label: 'Data Model' },
  ];

  return (
    <div style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      maxWidth: '700px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        padding: '20px 24px',
        color: 'white',
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '18px', 
          fontWeight: '600',
          fontFamily: 'Georgia, serif',
        }}>
          Property Types Taxonomy
        </h1>
        <p style={{ 
          margin: '4px 0 0 0', 
          fontSize: '13px', 
          opacity: 0.8,
        }}>
          Simplified proposal for multi-stakeholder needs
        </p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #E2E8F0',
        background: '#F8FAFC',
        overflowX: 'auto',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            style={{
              padding: '12px 16px',
              border: 'none',
              background: activeView === tab.id ? 'white' : 'transparent',
              borderBottom: activeView === tab.id ? '2px solid #3B82F6' : '2px solid transparent',
              color: activeView === tab.id ? '#1E293B' : '#64748B',
              fontWeight: activeView === tab.id ? '600' : '400',
              fontSize: '12px',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ minHeight: '400px' }}>
        {activeView === 'overview' && renderOverview()}
        {activeView === 'renter' && renderRenterView()}
        {activeView === 'ecommerce' && renderEcommerceView()}
        {activeView === 'enterprise' && renderEnterpriseView()}
        {activeView === 'datamodel' && renderDataModel()}
      </div>

      {/* Footer */}
      <div style={{
        background: '#F8FAFC',
        padding: '12px 24px',
        borderTop: '1px solid #E2E8F0',
        fontSize: '11px',
        color: '#94A3B8',
      }}>
        RentSync Property Taxonomy Proposal • Click tabs to explore each stakeholder view
      </div>
    </div>
  );
};

export default PropertyTaxonomyProposal;
