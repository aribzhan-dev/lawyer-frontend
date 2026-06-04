from __future__ import annotations

from fastapi import APIRouter, HTTPException, Response, status

from app.api.deps import AdminDep, DBDep
from app.repositories.service_repo import ServiceRepository
from app.schemas.service import ServiceCreate, ServiceOut, ServiceUpdate

router = APIRouter(prefix="/services", tags=["Services"])


@router.get("/tree", response_model=list[ServiceOut])
async def get_service_tree(db: DBDep) -> list[ServiceOut]:
    """Public: returns the full nested service tree (root → children → grandchildren)."""
    repo = ServiceRepository(db)
    return await repo.get_root_services()


@router.get("/flat", response_model=list[ServiceOut])
async def get_services_flat(db: DBDep) -> list[ServiceOut]:
    """Public: flat list of all services, useful for admin dropdowns."""
    repo = ServiceRepository(db)
    return await repo.get_flat_list()


@router.get("/{service_id}", response_model=ServiceOut)
async def get_service(service_id: int, db: DBDep) -> ServiceOut:
    repo = ServiceRepository(db)
    service = await repo.get(service_id)
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return service


@router.post("", response_model=ServiceOut, status_code=status.HTTP_201_CREATED)
async def create_service(
    payload: ServiceCreate,
    db: DBDep,
    _: AdminDep,
) -> ServiceOut:
    repo = ServiceRepository(db)
    return await repo.create(payload.model_dump())


@router.put("/{service_id}", response_model=ServiceOut)
async def update_service(
    service_id: int,
    payload: ServiceUpdate,
    db: DBDep,
    _: AdminDep,
) -> ServiceOut:
    repo = ServiceRepository(db)
    service = await repo.get(service_id)
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    return await repo.update(service, payload.model_dump(exclude_unset=True))


@router.delete("/{service_id}")
async def delete_service(
    service_id: int,
    db: DBDep,
    _: AdminDep,
) -> Response:
    repo = ServiceRepository(db)
    service = await repo.get(service_id)
    if not service:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Service not found")
    await repo.delete(service)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
