import React from 'react';
import { FixedSizeList as List } from 'react-window';

import styles from '../ContentManager.module.scss';
import AutoSizer from 'react-virtualized-auto-sizer';
import InfiniteLoader from 'react-window-infinite-loader';
import { Link } from 'react-router-dom';

import { ButtonFieldSet } from '../../../components/Form/ButtonFieldSet ';
import { SearchInput } from '../../../components/SearchInput';
import { buildApiService } from '../../../services/ApiService';
import { useEntityCollection } from '../useEntityCollection';
import Modali, { useModali } from 'modali';
import { Host } from '../../../models/host';
import { MarkdownInput } from '../../../components/Form/MarkdownInput';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { Stack } from 'office-ui-fabric-react';
import { Collapse, Icon } from 'antd';
import { Row as ARow, Col } from 'antd';
import { TextInput } from '../../../components/Form/TextInput';
import { Button } from 'antd';
import { DatePicker } from 'antd';
import { Select, Spin } from 'antd';
import { DateTime } from '../../../components/Form/DateTime';
import { MultiSelect } from '../../../components/Form/MultiSelect';

const { Panel } = Collapse;

const Presenter = () => {};

export default Presenter;
