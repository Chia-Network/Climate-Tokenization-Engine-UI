import React, { useState } from 'react';

import {
  Card,
  H3,
  H2,
  H4,
  H1,
  Subtitle,
  MenuText,
  ButtonText,
  PrimaryButton,
  LightThemeIcon,
  ToolTip,
  ToolTipPlacement,
  Popover,
  PopoverPlacement,
  Alert,
  Tag,
  LocaleIcon,
  StandardInput,
  InputSizeEnum,
  InputStateEnum,
  InputVariantEnum,
  SearchInput,
  Textarea,
  TextareaSizeEnum,
  TextareaStateEnum,
  AddIcon,
  ClimateWarehouseLogo,
  CloseIcon,
  DarkThemeIcon,
  ErrorIconSmall,
  ErrorIcon,
  InfoIconSmall,
  InfoIcon,
  MagnifyGlassIcon,
  MagnifyGlassIconWhite,
  SuccessIcon,
  SuccessIconSmall,
  WarningIcon,
  WarningIconSmall,
  Body,
  Notification,
  ArrowDownIcon,
  CheckIcon,
  Pagination,
  ComponentRepeater,
  Tabs,
  Tab,
  TabPanel,
  DownloadIcon,
  EllipsisMenuIcon,
  EllipseIcon,
  BasicMenu,
  UploadIcon,
  WarehouseIcon,
  RegistryIcon,
  AddIconCircle,
} from '../components';

const StoryBook = () => {
  const tooltipContent =
    'Distinctively monetize cost effective networks for cross-media bandwidth';

  const standardInputPlaceholder = 'Input placeholder';

  const popoverContent =
    'Conveniently initiate viral synergy without multi functional platforms. ';

  const paginationCallback = e => console.log(e);

  const addNewTagCallback = () => console.log('add tag');

  const popoverTitle = 'Popover title';

  const [repeaterValues, updateRepeaterValues] = useState([]);

  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Card>
        <H1>This is an header H1</H1>
        <H2>This is an header H2</H2>
        <H3>This is an header H3</H3>
        <H4>This is an header H4</H4>
        <Subtitle>This is a Subtitle</Subtitle>
        <MenuText>This is Menu Text</MenuText>
        <ButtonText>This is Button Text</ButtonText>

        <ComponentRepeater
          values={repeaterValues}
          updateValues={updateRepeaterValues}
          initialValue={'initial value'}
          component={
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText="Large input"
              state={InputStateEnum.default}
            />
          }
          addIcon={<AddIcon height={14} width={14} fill={'#1890FF'} />}
          removeIcon={<CloseIcon height={12} width={12} fill={'#1890FF'} />}
        />

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginTop: '50px',
          }}>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Top}>
            <ButtonText>Tooltip Top</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Bottom}>
            <ButtonText>Bottom</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Left}>
            <ButtonText>Left</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.Right}>
            <ButtonText>Right</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.TopLeft}>
            <ButtonText>Top-Left</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.TopRight}>
            <ButtonText>Top-Right</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.BottomLeft}>
            <ButtonText>Bottom-Left</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.BottomRight}>
            <ButtonText>Bottom-Right</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.LeftTop}>
            <ButtonText>Left-Top</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.LeftBottom}>
            <ButtonText>Left-Bottom</ButtonText>
          </ToolTip>
          <ToolTip body={tooltipContent} placement={ToolTipPlacement.RightTop}>
            <ButtonText>Right-Top</ButtonText>
          </ToolTip>
          <ToolTip
            body={tooltipContent}
            placement={ToolTipPlacement.RightBottom}>
            <ButtonText>Right-Bottom</ButtonText>
          </ToolTip>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '50px',
          }}>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Top}>
            <ButtonText>Popover Top</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Bottom}>
            <ButtonText>Bottom</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Left}>
            <ButtonText>Left</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.Right}>
            <ButtonText>Right</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.TopLeft}>
            <ButtonText>Top-Left</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.TopRight}>
            <ButtonText>Top-Right</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.BottomLeft}>
            <ButtonText>Bottom-Left</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.BottomRight}>
            <ButtonText>Bottom-Right</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.LeftTop}>
            <ButtonText>Left-Top</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.LeftBottom}>
            <ButtonText>Left-Bottom</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.RightTop}>
            <ButtonText>Right-Top</ButtonText>
          </Popover>
          <Popover
            title={popoverTitle}
            body={popoverContent}
            placement={PopoverPlacement.RightBottom}>
            <ButtonText>Right-Bottom</ButtonText>
          </Popover>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            height: '120px',
            marginTop: '50px',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText="Large input"
              state={InputStateEnum.disabled}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText="Default input"
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText="Small input"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.error}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.error}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.error}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.warning}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.warning}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.warning}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              marginRight: '30px',
            }}>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.success}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <StandardInput
              size={InputSizeEnum.large}
              placeholderText={standardInputPlaceholder}
              state={InputStateEnum.disabled}
              variant={InputVariantEnum.success}
              prefix={<LocaleIcon width={14} height={14} />}
            />
            <StandardInput
              size={InputSizeEnum.default}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
              suffix={<LocaleIcon width={14} height={14} />}
            />
            <StandardInput
              size={InputSizeEnum.small}
              placeholderText={standardInputPlaceholder}
              variant={InputVariantEnum.success}
              prefix={<LocaleIcon width={14} height={14} />}
              suffix={<LocaleIcon width={14} height={14} />}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            paddingTop: '50px',
            height: '210px',
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              marginRight: '50px',
            }}>
            <Textarea
              size={TextareaSizeEnum.large}
              placeholder="Large textarea"
            />
            <Textarea
              size={TextareaSizeEnum.default}
              placeholder="Default textarea"
            />
            <Textarea
              size={TextareaSizeEnum.small}
              placeholder="Small textarea"
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
            }}>
            <Textarea
              size={TextareaSizeEnum.large}
              placeholder="disabled state"
              state={TextareaStateEnum.disabled}
            />
            <Textarea
              size={TextareaSizeEnum.default}
              placeholder="hover state"
              state={TextareaStateEnum.hover}
            />
            <Textarea
              size={TextareaSizeEnum.small}
              placeholder="typing state"
              state={TextareaStateEnum.typing}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            paddingTop: '50px',
          }}>
          <BasicMenu
            options={[
              { label: 'item 1', action: () => console.log('click on item 1') },
              { label: 'item 1', action: () => console.log('click on item 2') },
            ]}
          />
          <BasicMenu
            options={[
              { label: 'item 1', action: () => console.log('click on item 1') },
              { label: 'item 1', action: () => console.log('click on item 2') },
            ]}>
            Menu
          </BasicMenu>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'start',
            paddingTop: '50px',
          }}>
          <div style={{ width: '50px' }}></div>
          <ClimateWarehouseLogo />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '50px',
            paddingBottom: '50px',
          }}>
          <AddIconCircle width="20" height="20" />
          <AddIcon width="20" height="20" fill="#262626" />
          <CloseIcon width="20" height="20" />
          <DarkThemeIcon width="20" height="20" />
          <ErrorIcon width="20" height="20" />
          <ErrorIconSmall width="20" height="20" />
          <InfoIcon width="20" height="20" />
          <InfoIconSmall width="20" height="20" />
          <LightThemeIcon width="20" height="20" />
          <LocaleIcon width="20" height="20" />
          <MagnifyGlassIcon width="20" height="20" />
          <MagnifyGlassIconWhite width="20" height="20" />
          <SuccessIcon width="20" height="20" />
          <SuccessIconSmall width="20" height="20" />
          <WarningIcon width="20" height="20" />
          <WarningIconSmall width="20" height="20" />
          <ArrowDownIcon width="20" height="20" />
          <CheckIcon width="20" height="20" />
          <DownloadIcon width="20" height="20" />
          <UploadIcon width="20" height="20" />
          <EllipsisMenuIcon />
          <EllipseIcon height="6" width="6" fill="#1890FF" />
          <WarehouseIcon height="20" width="20" fill="#1890FF" />
          <RegistryIcon height="20" width="20" fill="#1890FF" />
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            margin: '50px 0px',
          }}>
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: '20px',
            }}>
            <Pagination
              pages={24}
              current={19}
              callback={paginationCallback}
              showLast
            />
            <Pagination pages={24} current={0} callback={paginationCallback} />
            <Pagination pages={24} current={21} callback={paginationCallback} />
            <Pagination pages={24} current={22} callback={paginationCallback} />
            <Pagination pages={24} current={23} callback={paginationCallback} />
          </div>
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: '20px',
            }}>
            <Pagination pages={6} current={6} callback={paginationCallback} />
            <Pagination pages={6} current={5} callback={paginationCallback} />
            <Pagination pages={6} current={4} callback={paginationCallback} />
            <Pagination pages={6} current={3} callback={paginationCallback} />
            <Pagination pages={6} current={2} callback={paginationCallback} />
          </div>
          <div
            style={{
              display: 'inline-flex',
              justifyContent: 'flex-start',
              flexDirection: 'column',
              gap: '20px',
            }}>
            <Pagination pages={1} current={1} callback={paginationCallback} />
            <Pagination pages={2} current={2} callback={paginationCallback} />
            <Pagination pages={3} current={3} callback={paginationCallback} />
            <Pagination pages={4} current={4} callback={paginationCallback} />
            <Pagination pages={5} current={5} callback={paginationCallback} />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '20px',
            height: '100px',
            justifyContent: 'flex-start',
            width: '80%',
            flexWrap: 'wrap',
            alignItems: 'center',
            marginTop: '100px',
          }}>
          <PrimaryButton
            label="Default type button"
            size="large"
            type="default"
          />
          <PrimaryButton label="Button" size="large" />
          <PrimaryButton label="Button" size="default" />
          <PrimaryButton label="Button" size="small" />
          <PrimaryButton label="Button" size="large" danger />
          <PrimaryButton label="Button" size="default" danger />
          <PrimaryButton label="Button" size="small" danger />
          <PrimaryButton
            label="Button"
            size="large"
            icon={<LightThemeIcon color="white" />}
          />
          <PrimaryButton
            label="Button"
            size="default"
            icon={<LightThemeIcon color="white" />}
          />
          <PrimaryButton
            label="Button"
            size="small"
            icon={<LightThemeIcon color="white" height={15} />}
          />
          <PrimaryButton label="Button" size="large" danger loading />
          <PrimaryButton label="Button" size="default" danger loading />
          <PrimaryButton label="Button" size="small" danger loading />

          <PrimaryButton label="Button" size="large" danger disabled />
          <PrimaryButton label="Button" size="default" danger disabled />
          <PrimaryButton label="Button" size="small" danger disabled />
        </div>
        <div style={{ marginTop: '100px' }}>
          <Alert
            type="info"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="info"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="info"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="info"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
          <Alert
            type="warning"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="warning"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="warning"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="warning"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
          <Alert
            type="error"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="error"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="error"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="error"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
          <Alert
            type="success"
            banner={false}
            alertTitle="Alert Title"
            showIcon
            closeable
          />
          <Alert
            type="success"
            banner={true}
            alertTitle="Alert Title"
            closeText="Close now"
          />
          <Alert
            type="success"
            banner={false}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            showIcon
            closeable
          />
          <Alert
            type="success"
            banner={true}
            alertTitle="Alert Title"
            alertBody="Interactively monetize corporate alignments and fully tested niche markets."
            closeText="Close Now"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <SearchInput size="small" />
          <SearchInput size="small" outline />
          <SearchInput size="small" usePrimaryButton />
          <SearchInput size="small" usePrimaryButton buttonText="Search" />
          <SearchInput size="small" buttonText="Search" outline />
          <SearchInput size="default" />
          <SearchInput size="default" outline />
          <SearchInput size="default" usePrimaryButton />
          <SearchInput size="default" usePrimaryButton buttonText="Search" />
          <SearchInput size="default" buttonText="Search" outline />
          <SearchInput size="large" />
          <SearchInput size="large" outline />
          <SearchInput size="large" usePrimaryButton />
          <SearchInput
            size="large"
            buttonText="Search"
            usePrimaryButton
            outline
          />
        </div>

        <div>
          <Tag addNew={addNewTagCallback} />
          <Tag closeable body="Tag" onClose={addNewTagCallback} />
          <Tag addNew={addNewTagCallback} body="Tag" />
          <Tag body="Tag" />
          <Tag />
        </div>

        <div>
          <Body size="Big">This is Big Body Text</Body>
          <Body>This is Regular Body Text</Body>
          <Body size="Bold">This is Bold Body Text</Body>
          <Body size="Small">This is Small Body Text</Body>
          <Body size="Small Bold">This is Small Bold Body Text</Body>
          <Body size="X-Small">This is X-Small Body text</Body>
          <Body size="X-Small Bold">This is X-Small Bold Body Text</Body>
        </div>
        <div>
          <Notification />
          <Notification buttonText="Button" />
          <Notification showIcon="info" />
          <Notification showIcon="info" buttonText="Button" />
          <Notification showIcon="error" />
          <Notification showIcon="error" buttonText="Button" />
          <Notification showIcon="warning" />
          <Notification showIcon="warning" buttonText="Button" />
          <Notification showIcon="success" />
          <Notification showIcon="success" buttonText="Button" />
        </div>

        <div>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="basic tabs example">
            <Tab label="Tab One" />
            <Tab label="Tab Two" />
            <Tab label="Tab Three" />
          </Tabs>
          <div>
            <TabPanel value={tabValue} index={0}>
              Item One
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              Item Three
            </TabPanel>
          </div>
        </div>
      </Card>
    </>
  );
};

export { StoryBook };
