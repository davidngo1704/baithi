import React, { useState } from 'react';
import {
  Button,
  Card,
  FormLayout,
  Page,
  Select,
  TextField,
  InlineError,
  Layout
} from '@shopify/polaris';
import { DeleteIcon } from '@shopify/polaris-icons'; // Import icon delete

function DiscountForm() {
  const [campaignName, setCampaignName] = useState('');
  const [options, setOptions] = useState([
    { title: '', quantity: 1, discountType: 'None', amount: '' },
    { title: '', quantity: 2, discountType: 'None', amount: '' },
  ]);
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState([]);

  const discountTypes = [
    { label: 'None', value: 'None' },
    { label: '% discount', value: 'percent' },
    { label: 'Discount / each', value: 'fixed' },
  ];

  const validateForm = () => {
    let formErrors = {};
    if (campaignName === '') {
      formErrors.campaignName = 'Campaign Name is required';
    }
    options.forEach((option, index) => {
      if (option.title === '') {
        formErrors[`title_${index}`] = 'Title is required';
      }
      if (option.quantity === '' || isNaN(option.quantity)) {
        formErrors[`quantity_${index}`] = 'Quantity must be a number';
      }
      if (option.discountType !== 'None' && (option.amount === '' || isNaN(option.amount))) {
        formErrors[`amount_${index}`] = 'Amount must be a number';
      }
    });
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleAddOption = () => {
    const lastQuantity = options[options.length - 1]?.quantity || 0;
    const newOption = { title: '', quantity: lastQuantity + 1, discountType: 'None', amount: '' };
    setOptions([...options, newOption]);
  };

  const handleRemoveOption = (index) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleSave = () => {
    if (validateForm()) {
      console.log('Saving data...', { campaignName, options });
      alert('Form saved successfully!');
    } else {
      alert('Please fix the validation errors.');
    }
  };

  const handleFieldChange = (field, value, index) => {
    const newOptions = [...options];
    newOptions[index][field] = value;
    setOptions(newOptions);
    setPreview(newOptions);
  };

  return (
    <Page title="Create volume discount">
      <Layout>
      <div style={{display: "flex", justifyContent: "center"}}>
        {/* Form Section */}
        <Layout.Section>
          <FormLayout>
            <Card sectioned title="Campaign Details">
              <TextField
                label="Campaign Name"
                value={campaignName}
                onChange={(value) => setCampaignName(value)}
                error={errors.campaignName}
              />
            </Card>

            <Card sectioned title="Options">
              {options.map((option, index) => (
                <Card key={index} sectioned>
                  <div style={{ position: 'relative' }}>
                    {/* Nút delete ở góc trên bên phải */}
                    <Button
                      icon={DeleteIcon}
                      onClick={() => handleRemoveOption(index)}
                      plain
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                      }}
                      accessibilityLabel="Remove option"
                    />
                    <Layout>
                      <Layout.Section oneThird>
                        <TextField
                          label="Title"
                          value={option.title}
                          onChange={(value) => handleFieldChange('title', value, index)}
                          error={errors[`title_${index}`]}
                        />
                      </Layout.Section>
                      <Layout.Section oneThird>
                        <TextField
                          label="Quantity"
                          type="number"
                          value={option.quantity}
                          onChange={(value) => handleFieldChange('quantity', value, index)}
                          error={errors[`quantity_${index}`]}
                        />
                      </Layout.Section>
                      <Layout.Section oneThird>
                        <Select
                          label="Discount Type"
                          options={discountTypes}
                          value={option.discountType}
                          onChange={(value) => handleFieldChange('discountType', value, index)}
                        />
                        {(option.discountType === 'percent' || option.discountType === 'fixed') && (
                          <TextField
                            label="Amount"
                            suffix={option.discountType === 'percent' ? '%' : '$'}
                            type="number"
                            value={option.amount}
                            onChange={(value) => handleFieldChange('amount', value, index)}
                            error={errors[`amount_${index}`]}
                          />
                        )}
                      </Layout.Section>
                    </Layout>
                    {/* Hiển thị lỗi */}
                    {errors[`title_${index}`] && (
                      <InlineError message={errors[`title_${index}`]} fieldID={`title_${index}`} />
                    )}
                    {errors[`quantity_${index}`] && (
                      <InlineError message={errors[`quantity_${index}`]} fieldID={`quantity_${index}`} />
                    )}
                    {errors[`amount_${index}`] && (
                      <InlineError message={errors[`amount_${index}`]} fieldID={`amount_${index}`} />
                    )}
                  </div>
                </Card>
              ))}

              <Button onClick={handleAddOption}>Add Option</Button>
            </Card>

            <Button primary onClick={handleSave}>
              Save
            </Button>
          </FormLayout>
        </Layout.Section>

        {/* Preview Section */}
        <Layout.Section secondary>
          <Card sectioned title="Preview Options">
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Title</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Quantity</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Discount Type</th>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {preview.map((option, index) => (
                  <tr key={index}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{option.title}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{option.quantity}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>{option.discountType}</td>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                      {option.discountType === 'percent' ? `${option.amount}%` : option.discountType === 'fixed' ? `$${option.amount}` : ''}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </Layout.Section>
        </div>
   
      </Layout>
    </Page>
  );
}

function App() {
  return <DiscountForm />;
}

export default App;