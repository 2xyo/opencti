import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose, contains } from 'ramda';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import inject18n from '../../../../components/i18n';
import OrganizationHeader from './OrganizationHeader';
import EntityReports from '../../reports/EntityReports';

const styles = () => ({
  container: {
    margin: 0,
  },
  paper: {
    minHeight: '100%',
    margin: '5px 0 0 0',
    padding: '15px',
    borderRadius: 6,
  },
});

const organizationTypesForAuthorMode = ['vendor', 'csirt', 'partner'];

class OrganizationReportsComponent extends Component {
  render() {
    const { classes, organization } = this.props;
    if (contains(organization.organization_class, organizationTypesForAuthorMode)) {
      return (
        <div className={classes.container}>
          <OrganizationHeader organization={organization}/>
          <Paper classes={{ root: classes.paper }} elevation={2}>
            <EntityReports authorId={organization.id}/>
          </Paper>
        </div>
      );
    }
    return (
      <div className={classes.container}>
        <OrganizationHeader organization={organization}/>
        <Paper classes={{ root: classes.paper }} elevation={2}>
          <EntityReports entityId={organization.id}/>
        </Paper>
      </div>
    );
  }
}

OrganizationReportsComponent.propTypes = {
  organization: PropTypes.object,
  classes: PropTypes.object,
  t: PropTypes.func,
};

const OrganizationReports = createFragmentContainer(
  OrganizationReportsComponent,
  {
    organization: graphql`
      fragment OrganizationReports_organization on Organization {
        id
        ...OrganizationHeader_organization
      }
    `,
  },
);

export default compose(
  inject18n,
  withStyles(styles),
)(OrganizationReports);
