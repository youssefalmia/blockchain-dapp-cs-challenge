package ieee.cs.trackingappbackend.web;

import ieee.cs.trackingappbackend.entities.TrackingData;
import ieee.cs.trackingappbackend.repositories.TrackingDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
public class TrackingDataController {

    @Autowired
    TrackingDataRepository trackingDataRepository;

    @GetMapping("/trackingData")
    @CrossOrigin("*")
    public List<TrackingData> getTrackingData(){
        return trackingDataRepository.findAll();
    }
    @GetMapping("/trackingData/{id}")
    public TrackingData getTrackingDataById(@PathVariable Long id){
        return trackingDataRepository.findById(id).get();
    }
    @GetMapping("/trackingData/byPackageId/{id}")
    public List<TrackingData> getTrackingDataByPackageId(@PathVariable String id){
        return trackingDataRepository.getAllByIdPackage(id);
    }
    @GetMapping("/trackingData/last")
    public TrackingData getLast(){
        return trackingDataRepository.findTopByOrderByIdDesc();
    }
    @GetMapping("/trackingData/validatedFalse")
    public List<TrackingData> getValidatedFalse(){
        return trackingDataRepository.findByValidatedFalse();
    }
    @GetMapping("/trackingData/validatedFalse/{idPackage}")
    public List<TrackingData> getByIdPackageAndValidatedFalse(@PathVariable String idPackage){
        return trackingDataRepository.findByIdPackageAndValidatedFalse(idPackage);
    }


    @PostMapping("/trackingData")
    public void saveTrackingData(@RequestBody TrackingData TrackingData){
        trackingDataRepository.save(TrackingData);
    }

    @PutMapping("/trackingData/{id}")
    public void updateTrackingData(@PathVariable Long id,@RequestBody TrackingData TrackingData){
        TrackingData TrackingData1 = trackingDataRepository.findById(id).get();
    }
    @DeleteMapping("/trackingData/{id}")
    public void deleteTrackingData(@PathVariable Long id){
        trackingDataRepository.deleteById(id);
    }

}
