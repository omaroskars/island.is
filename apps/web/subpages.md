# Subpages

This is an overview and general guideline on how to set up and add a new subpage
to the web project.

## Layouts and Layout Components

A `SubpageLayout` (`@island.is/web/screens/Layouts/Layouts`) has been created in
the web app. This layout has a required
`main` prop and an optional `details` prop. It is mainly used to split the
content up if needed. The props are ReactNodes so the main and details portions
of the layout are entirely customizable.

Generally the main content portion is supposed to contain some introduction to
the content displayed in the details portion.

For landing pages, this layout should be used with an empty details prop.

_-Pictures of sample layouts here?-_

Main content should generally contain a navigation sidebar. This should be
implemented using the `SidebarLayout`
(`@island.is/web/screens/Layouts/SidebarLayout`)
in the web app.

### Layout Components

Two layout components have been created in the web app. `SubpageMainContent` and
`SubpageDetailContent`. These components were based on figma designs so they
should be universally used to maintain UX consistency between subpages.

#### Main Subpage Content

It is recommended to use the `SubpageMainContent` (`@island.is/web/components`)
layout component to wrap the main content. This component provides structure and
responsiveness to the main content. It has a `main` prop and an optional
`image` prop. The `image` prop gets hidden on smaller screens.

#### Details Subpage Content

It is recommended to use the `SubpageDetailContent` (`@island.is/web/components`)
layout component to wrap the detail content. This component has a `header` prop
and a `content` prop. Both props are required and this component sets them up
nicely so that the details header appears on top.

## Components

An overview of the most important non-layout subpage components.

_If these components don't fit the intended look of your subpage feel free to
create new ones that do._

### Navigation Sidebar

The navigation sidebar can be implemented using the `Navigation` component from
the `island-ui/core` library and adding that as a `sidebarContent` prop
to the SidebarLayout.

### Filter

_-Maybe not necessary-_

## Contentful

All static content should be stored in the island.is contentful space.

### Content types

A content type, [Subpage Header](https://app.contentful.com/spaces/8k0h54kbe6bj/content_types?searchTerm=Subpage%20Header),
has been created in Contentful. This content type is intended to display an
introduction to the subpage's content. This should mostly be used in the main
prop. The body is a Rich Text element and can be displayed using the `RichText`
component in the `island-ui/core` library.

The content type, [UI Configuration](https://app.contentful.com/spaces/8k0h54kbe6bj/content_types?searchTerm=UI%20configuration),
is a key-value content type and useful for storing short text snippets needed
on a subpage.

If the content to be displayed in the main part of the subpage does not fit into
the `SubpageHeader` content type it is possible to create a new content type in
Contentful and hook that up to the web via elastic search.

### Adding New Content Types

To add a new content type to the web project it needs to be created in
Contentful and then hooked up to the project via elastic search. To do this,
follow these steps:

1. Create your content type in the island.is Contentful space and publish it.

2. Run `yarn nx run api:contentful-types` in the root of the island.is project. This ensures type safety between Contentful and the API.

3. Run `yarn nx run api:contentType --id=<contentTypeId>` where `<contentTypeId>` is the ID of your content type. _Note: Make sure you have the CONTENT_MANAGEMENT_ACCESS_TOKEN env variable set to your content management token. This token is generated per user at https://app.contentful.com/account/profile/cma_tokens_.

4. Generate the GraphQL schemas using the following commands in the island.is project root:


    1. `yarn nx run api:contentful-types` Generates Contentful types in the API.

    2. `yarn nx run api:schemas/codegen --skip-nx-cache` Generates types in API based on models.

    3. `yarn nx run web:schemas/codegen --skip-nx-cache` Generates types in the web project based on queries

5. Sometimes the schemas don't update properly and your types will be missing. To fix this you should try running `yarn postinstall`.
