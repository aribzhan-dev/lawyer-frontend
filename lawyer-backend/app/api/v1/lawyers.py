from __future__ import annotations

from fastapi import APIRouter, HTTPException, Response, status

from app.api.deps import AdminDep, DBDep
from app.repositories.lawyer_repo import LawyerRepository
from app.schemas.lawyer import LawyerCreate, LawyerOut, LawyerUpdate

router = APIRouter(prefix="/lawyers", tags=["Lawyers"])


@router.get("", response_model=list[LawyerOut])
async def list_lawyers(db: DBDep) -> list[LawyerOut]:
    """Public: list all active lawyers ordered by order field."""
    repo = LawyerRepository(db)
    return await repo.get_active()


@router.get("/all", response_model=list[LawyerOut])
async def list_all_lawyers(db: DBDep, _: AdminDep) -> list[LawyerOut]:
    """Admin: list all lawyers including inactive."""
    repo = LawyerRepository(db)
    return await repo.get_all()


@router.get("/{slug}", response_model=LawyerOut)
async def get_lawyer(slug: str, db: DBDep) -> LawyerOut:
    """Public: single lawyer profile by slug."""
    repo = LawyerRepository(db)
    lawyer = await repo.get_by_slug(slug)
    if not lawyer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lawyer not found")
    return lawyer


@router.post("", response_model=LawyerOut, status_code=status.HTTP_201_CREATED)
async def create_lawyer(
    payload: LawyerCreate,
    db: DBDep,
    _: AdminDep,
) -> LawyerOut:
    repo = LawyerRepository(db)
    data = payload.model_dump(exclude={"service_ids"})
    return await repo.create_with_services(data, payload.service_ids)


@router.put("/{lawyer_id}", response_model=LawyerOut)
async def update_lawyer(
    lawyer_id: int,
    payload: LawyerUpdate,
    db: DBDep,
    _: AdminDep,
) -> LawyerOut:
    repo = LawyerRepository(db)
    lawyer = await repo.get(lawyer_id)
    if not lawyer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lawyer not found")
    data = payload.model_dump(exclude_unset=True, exclude={"service_ids"})
    return await repo.update_with_services(lawyer, data, payload.service_ids)


@router.delete("/{lawyer_id}")
async def delete_lawyer(
    lawyer_id: int,
    db: DBDep,
    _: AdminDep,
) -> Response:
    repo = LawyerRepository(db)
    lawyer = await repo.get(lawyer_id)
    if not lawyer:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lawyer not found")
    await repo.delete(lawyer)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
