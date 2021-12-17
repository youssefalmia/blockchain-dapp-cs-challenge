package ieee.cs.trackingappbackend.repositories;

import ieee.cs.trackingappbackend.entities.TrackingData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

public interface TrackingDataRepository extends JpaRepository<TrackingData,Long> {

    List<TrackingData> getAllByIdPackage(String idPackage);
    TrackingData findTopByOrderByIdDesc();
    List<TrackingData> findByValidatedFalse();
    List<TrackingData> findByIdPackageAndValidatedFalse(String idPackage);

}
