### Feature: Container Management

#### Scenario: Creating a New Container

```gherkin
Given the user is on the dashboard
When the user clicks on "Create Container"
Then a form for creating a new container should be displayed

Given the user is on the "Create Container" form
When the user provides a container name and description
And clicks the "Create" button
Then a new container with the given name and description should be added to the dashboard
And a success message should be displayed
```

#### Scenario: Editing an Existing Container

```gherkin
Given the user is on the dashboard
And there is an existing container named "Kitchen"
When the user clicks on the "Edit" button for the "Kitchen" container
Then a form for editing the "Kitchen" container should be displayed

Given the user is on the "Edit Container" form for "Kitchen"
When the user updates the container name to "Pantry"
And updates the description to "Pantry container"
And clicks the "Save" button
Then the "Kitchen" container should be renamed to "Pantry"
And its description should be updated to "Pantry container"
And a success message should be displayed
```

#### Scenario: Deleting an Existing Container

```gherkin
Given the user is on the dashboard
And there is an existing container named "Garage"
When the user clicks on the "Delete" button for the "Garage" container
Then a confirmation dialog for deleting the "Garage" container should be displayed

Given the user is on the confirmation dialog
When the user confirms the deletion
Then the "Garage" container and all its items should be deleted
And a success message should be displayed
```