import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useIntl } from 'react-intl';

import { Modal, modalTypeEnum, Tab, Tabs, TabPanel, UnitDetails } from '..';

const ConfirmDetokanizationModal = ({
  onClose,
  unit,
  modalSizeAndPosition,
}) => {
  const { notification } = useSelector(app => app);
  const intl = useIntl();
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = useCallback(
    (event, newValue) => setTabValue(newValue),
    [setTabValue],
  );

  const unitKeys = Object?.keys(unit);
  const unitDetails = {};
  const unitTabs = [];

  unitKeys?.forEach(key => {
    const keyValue = unit[key];
    if (typeof keyValue !== 'object' || keyValue === null) {
      unitDetails[key] = keyValue;
    } else if (keyValue instanceof Array && keyValue.length) {
      unitTabs.unshift({ tabName: key, tabData: keyValue });
    } else if (!(keyValue instanceof Array)) {
      unitTabs.unshift({ tabName: key, tabData: keyValue });
    }
  });

  const onSubmit = () => {
    console.log('trigger action from store');
  };

  const isDetokanizationSuccessful =
    notification && notification.id === 'detokanization-successful';
  useEffect(() => {
    if (isDetokanizationSuccessful) {
      onClose();
    }
  }, [notification]);

  return (
    <Modal
      modalSizeAndPosition={modalSizeAndPosition}
      modalType={modalTypeEnum.basic}
      title={intl.formatMessage({
        id: 'confirm-detokanization',
      })}
      label={intl.formatMessage({
        id: 'confirm',
      })}
      onClose={onClose}
      onOk={onSubmit}
      body={
        <>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Unit details" />
            {unitTabs?.length > 0 &&
              unitTabs.map(tab => (
                <Tab label={tab.tabName} key={tab.tabName} />
              ))}
          </Tabs>
          <TabPanel value={tabValue} index={0}>
            <UnitDetails data={unitDetails} />
          </TabPanel>
          {unitTabs?.length > 0 &&
            unitTabs.map((tab, index) => (
              <TabPanel value={tabValue} index={index + 1} key={tab.tabName}>
                <UnitDetails data={tab.tabData} />
              </TabPanel>
            ))}
        </>
      }
    />
  );
};

export { ConfirmDetokanizationModal };
