## Controller-Service Connection

### ContainerController

Connects to the `ContainerService` to handle container-related logic.

### ItemController

Connects to the `ItemService` to handle item-related logic.

## Service-Database Connection

### ContainerService

Handles CRUD operations related to containers in the MongoDB database.

### ItemService

Handles CRUD operations related to items in the MongoDB database.

### Controller-Service Connection Diagram
```mermaid
graph TD
  subgraph ContainerController
    A[Create Container] -->|Calls| B[ContainerService.createContainer]
    C[Get All Containers] -->|Calls| D[ContainerService.getContainers]
    E[Get Container by ID] -->|Calls| F[ContainerService.getContainerById]
    G[Update Container by ID] -->|Calls| H[ContainerService.updateContainer]
    I[Delete Container by ID] -->|Calls| J[ContainerService.deleteContainer]
    K[Move Item to Container] -->|Calls| L[ContainerService.moveItemToContainer]
    M[Get Container by Item ID] -->|Calls| N[ContainerService.getItemContainer]
  end

  subgraph ItemController
    O[Get All Items] -->|Calls| P[ItemService.getAllItems]
    Q[Create Item] -->|Calls| R[ItemService.createItem]
    S[Get Items by Container ID] -->|Calls| T[ItemService.getItemsByContainerId]
    U[Get Item by ID] -->|Calls| V[ItemService.getItemById]
    W[Update Item by ID] -->|Calls| X[ItemService.updateItem]
    Y[Delete Item by ID] -->|Calls| Z[ItemService.deleteItem]
  end
```

### Service-Database Connection Diagram

```mermaid
graph TD
  subgraph ContainerService
    A[Create Container] -->|Inserts| B[MongoDB containers Collection]
    C[Get All Containers] -->|Finds| D[MongoDB containers Collection]
    E[Get Container by ID] -->|Finds| F[MongoDB containers Collection]
    G[Update Container by ID] -->|Updates| H[MongoDB containers Collection]
    I[Delete Container by ID] -->|Deletes| J[MongoDB containers Collection]
    K[Move Item to Container] -->|Custom Logic| L[MongoDB containers Collection]
    M[Get Container by Item ID] -->|Finds| N[MongoDB containers Collection]
  end

  subgraph ItemService
    O[Create Item] -->|Inserts| P[MongoDB items Collection]
    Q[Get All Items] -->|Finds| R[MongoDB items Collection]
    S[Get Items by Container ID] -->|Finds| T[MongoDB items Collection]
    U[Get Item by ID] -->|Finds| V[MongoDB items Collection]
    W[Update Item by ID] -->|Updates| X[MongoDB items Collection]
    Y[Delete Item by ID] -->|Deletes| Z[MongoDB items Collection]
  end
```