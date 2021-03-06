import {Fragment} from 'react';
import styled from '@emotion/styled';
import {Location} from 'history';
import pick from 'lodash/pick';

import Badge from 'app/components/badge';
import Breadcrumbs from 'app/components/breadcrumbs';
import Clipboard from 'app/components/clipboard';
import IdBadge from 'app/components/idBadge';
import * as Layout from 'app/components/layouts/thirds';
import ExternalLink from 'app/components/links/externalLink';
import ListLink from 'app/components/links/listLink';
import NavTabs from 'app/components/navTabs';
import Tooltip from 'app/components/tooltip';
import Version from 'app/components/version';
import {URL_PARAM} from 'app/constants/globalSelectionHeader';
import {IconCopy, IconOpen} from 'app/icons';
import {t} from 'app/locale';
import space from 'app/styles/space';
import {Organization, Release, ReleaseMeta, ReleaseProject} from 'app/types';
import {formatAbbreviatedNumber, formatVersion} from 'app/utils/formatters';

import ReleaseActions from './releaseActions';

type Props = {
  location: Location;
  organization: Organization;
  release: Release;
  project: Required<ReleaseProject>;
  releaseMeta: ReleaseMeta;
  refetchData: () => void;
};

const ReleaseHeader = ({
  location,
  organization,
  release,
  project,
  releaseMeta,
  refetchData,
}: Props) => {
  const {version, url} = release;
  const {commitCount, commitFilesChanged} = releaseMeta;

  const releasePath = `/organizations/${organization.slug}/releases/${encodeURIComponent(
    version
  )}/`;

  const tabs = [
    {title: t('Overview'), to: releasePath},
    {
      title: (
        <Fragment>
          {t('Commits')} <NavTabsBadge text={formatAbbreviatedNumber(commitCount)} />
        </Fragment>
      ),
      to: `${releasePath}commits/`,
    },
    {
      title: (
        <Fragment>
          {t('Files Changed')}
          <NavTabsBadge text={formatAbbreviatedNumber(commitFilesChanged)} />
        </Fragment>
      ),
      to: `${releasePath}files-changed/`,
    },
  ];

  const getCurrentTabUrl = (path: string) => ({
    pathname: path,
    query: pick(location.query, Object.values(URL_PARAM)),
  });

  return (
    <Layout.Header>
      <Layout.HeaderContent>
        <Breadcrumbs
          crumbs={[
            {
              to: `/organizations/${organization.slug}/releases/`,
              label: t('Releases'),
              preserveGlobalSelection: true,
            },
            {label: formatVersion(version)},
          ]}
        />
        <Layout.Title>
          <ReleaseName>
            <IdBadge project={project} avatarSize={28} hideName />
            <StyledVersion version={version} anchor={false} truncate />
            <IconWrapper>
              <Clipboard value={version}>
                <Tooltip title={version} containerDisplayMode="flex">
                  <IconCopy />
                </Tooltip>
              </Clipboard>
            </IconWrapper>
            {!!url && (
              <IconWrapper>
                <Tooltip title={url}>
                  <ExternalLink href={url}>
                    <IconOpen />
                  </ExternalLink>
                </Tooltip>
              </IconWrapper>
            )}
          </ReleaseName>
        </Layout.Title>
      </Layout.HeaderContent>

      <Layout.HeaderActions>
        <ReleaseActions
          orgSlug={organization.slug}
          projectSlug={project.slug}
          release={release}
          releaseMeta={releaseMeta}
          refetchData={refetchData}
        />
      </Layout.HeaderActions>

      <Fragment>
        <StyledNavTabs>
          {tabs.map(tab => (
            <ListLink
              key={tab.to}
              to={getCurrentTabUrl(tab.to)}
              isActive={() => tab.to === location.pathname}
            >
              {tab.title}
            </ListLink>
          ))}
        </StyledNavTabs>
      </Fragment>
    </Layout.Header>
  );
};

const ReleaseName = styled('div')`
  display: flex;
  align-items: center;
`;

const StyledVersion = styled(Version)`
  margin-left: ${space(1)};
`;

const IconWrapper = styled('span')`
  transition: color 0.3s ease-in-out;
  margin-left: ${space(1)};

  &,
  a {
    color: ${p => p.theme.gray300};
    display: flex;
    &:hover {
      cursor: pointer;
      color: ${p => p.theme.textColor};
    }
  }
`;

const StyledNavTabs = styled(NavTabs)`
  margin-bottom: 0;
  /* Makes sure the tabs are pushed into another row */
  width: 100%;
`;

const NavTabsBadge = styled(Badge)`
  @media (max-width: ${p => p.theme.breakpoints[0]}) {
    display: none;
  }
`;

export default ReleaseHeader;
