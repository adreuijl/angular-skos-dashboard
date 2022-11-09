import {  gql } from 'apollo-angular';

export const GET_NodeShapes = gql`
query GetNodeShapes {
  nodeShapes {
    uri,
    label,
    property {uri, label}
  }
}
`;


