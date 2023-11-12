### Feature: Item Management

#### Scenario: Adding a New Item to a Container

```gherkin
Given the user is on the dashboard
And there is a container named "Living Room"
When the user clicks on the "Add Item" button for the "Living Room" container
Then a form for adding a new item to the "Living Room" container should be displayed

Given the user is on the "Add Item" form for "Living Room"
When the user provides item details including name, quantity, and expiration date
And clicks the "Add" button
Then a new item with the provided details should be added to the "Living Room" container
And a success message should be displayed
```

#### Scenario: Editing an Existing Item

```gherkin
Given the user is on the dashboard
And there is an item named "Television" in the "Living Room" container
When the user clicks on the "Edit" button for the "Television" item
Then a form for editing the "Television" item should be displayed

Given the user is on the "Edit Item" form for "Television"
When the user updates the item name to "LED TV"
And updates the quantity to "2"
And clicks the "Save" button
Then the "Television" item should be renamed to "LED TV"
And its quantity should be updated to "2"
And a success message should be displayed
```

#### Scenario: Deleting an Existing Item

```gherkin
Given the user is on the dashboard
And there is an item named "Laptop" in the "Home Office" container
When the user clicks on the "Delete" button for the "Laptop" item
Then a confirmation dialog for deleting the "Laptop" item should be displayed

Given the user is on the confirmation dialog
When the user confirms the deletion
Then the "Laptop" item should be deleted from the "Home Office" container
And a success message should be displayed
```

### Feature: Moving Items Between Containers (Note: This was discussed earlier)

```gherkin
Scenario: Moving an Item to a Different Container
Given the user is on the dashboard
And there is an item named "Coffee Maker" in the "Kitchen" container
And there is another container named "Pantry"
When the user selects "Coffee Maker" and chooses "Pantry" as the target container
And clicks the "Move" button
Then the "Coffee Maker" item should be transferred from the "Kitchen" container to the "Pantry" container
And a success message should be displayed
```