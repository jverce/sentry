import {Component} from 'react';
import {browserHistory} from 'react-router';
import styled from '@emotion/styled';
import {Query} from 'history';
import PropTypes from 'prop-types';

import Button from 'app/components/button';
import ButtonBar from 'app/components/buttonBar';
import {IconChevron} from 'app/icons';
import {t} from 'app/locale';
import {callIfFunction} from 'app/utils/callIfFunction';
import parseLinkHeader from 'app/utils/parseLinkHeader';

const defaultProps: DefaultProps = {
  size: 'small',
  onCursor: (cursor: string, path: string, query: Query, _direction: number) => {
    browserHistory.push({
      pathname: path,
      query: {...query, cursor},
    });
  },
};

type DefaultProps = {
  size?: 'zero' | 'xsmall' | 'small';
  onCursor?: (cursor: string, path: string, query: Query, _direction: number) => void;
};

type Props = DefaultProps & {
  className?: string;
  pageLinks: string | null | undefined;
  to?: string;
};

class Pagination extends Component<Props> {
  static contextTypes = {
    location: PropTypes.object,
  };

  static defaultProps = defaultProps;

  render() {
    const {className, onCursor, pageLinks, size} = this.props;
    if (!pageLinks) {
      return null;
    }

    const location = this.context.location;
    const path = this.props.to || location.pathname;
    const query = location.query;
    const links = parseLinkHeader(pageLinks);
    const previousDisabled = links.previous.results === false;
    const nextDisabled = links.next.results === false;

    return (
      <div className={className}>
        <ButtonBar merged>
          <Button
            icon={<IconChevron direction="left" size="sm" />}
            aria-label={t('Previous')}
            size={size}
            disabled={previousDisabled}
            onClick={() => {
              callIfFunction(onCursor, links.previous.cursor, path, query, -1);
            }}
          />
          <Button
            icon={<IconChevron direction="right" size="sm" />}
            aria-label={t('Next')}
            size={size}
            disabled={nextDisabled}
            onClick={() => {
              callIfFunction(onCursor, links.next.cursor, path, query, 1);
            }}
          />
        </ButtonBar>
      </div>
    );
  }
}

export default styled(Pagination)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 20px 0 0 0;
`;
